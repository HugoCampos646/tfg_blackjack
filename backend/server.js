// server.js
console.log("SERVIDOR NUEVO CARGADO");
const express = require("express");
const cors = require("cors");
const path = require("path");

const http = require("http");
const { Server } = require("socket.io");

const registroRoutes = require("./routes/registro");
const loginRoutes = require("./routes/login");
const consultaPuntosRoutes = require("./routes/consultaPuntos");
const cambiarNombreRoutes = require("./routes/cambiarNombre");
const cambiarContrasenaRoutes = require("./routes/cambiarContrasena");
const eliminarUsuarioRoutes = require("./routes/eliminarUsuario");
const ingresarPuntosRoutes = require("./routes/ingresarPuntos");
const estadisticasRoutes = require("./routes/estadisticas");
const actualizarPuntosRoutes = require("./routes/actualizarPuntos");
const actualizarEstadisticasRoutes = require("./routes/actualizarEstadisticas");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors());
app.use(express.json());

// rutas
app.use("/api/registro", registroRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/puntos", consultaPuntosRoutes);
app.use("/api/cambiarNombre", cambiarNombreRoutes);
app.use("/api/cambiarContrasena", cambiarContrasenaRoutes);
app.use("/api/eliminarUsuario", eliminarUsuarioRoutes);
app.use("/api/ingresarPuntos", ingresarPuntosRoutes);
app.use("/api/estadisticas", estadisticasRoutes);
app.use("/api/actualizarPuntos", actualizarPuntosRoutes);
app.use("/api/actualizarEstadisticas", actualizarEstadisticasRoutes);

// archivos estáticos
app.use(express.static(path.join(__dirname, "../")));


// SOCKETS
const salas = {};
const partidas = {};


// CREAR BARAJA
function crearBaraja() {

    const palos = ["C", "D", "H", "S"];

    const baraja = [];

    for (let palo of palos) {

        for (let i = 1; i <= 13; i++) {

            baraja.push({
                palo,
                valor: i
            });
        }
    }

    return baraja.sort(() => Math.random() - 0.5);
}


// SACAR CARTA
function sacarCarta(baraja) {

    return baraja.pop();
}


// CALCULAR PUNTOS
function calcularPuntos(mano) {

    let total = 0;

    let ases = 0;

    for (let carta of mano) {

        if (carta.valor >= 11) {
            total += 10;
        }

        else if (carta.valor === 1) {

            total += 11;
            ases++;
        }

        else {
            total += carta.valor;
        }
    }

    while (total > 21 && ases > 0) {

        total -= 10;
        ases--;
    }

    return total;
}


io.on("connection", (socket) => {
    
    socket.on("pedirCarta", (datos) => {

        console.log("PEDIR CARTA RECIBIDO");
        console.log(datos);

    });

    console.log("Usuario conectado");


    // UNIRSE
    socket.on("unirseMesa", (datos) => {

        const codigoMesa = datos.codigo;
        const usuario = datos.usuario;

        // crear sala
        if (!salas[codigoMesa]) {

            salas[codigoMesa] = [];
        }

        // sala llena
        if (salas[codigoMesa].length >= 2) {

            socket.emit("mesaLlena");

            return;
        }

        // unir socket
        socket.join(codigoMesa);

        // guardar jugador
        salas[codigoMesa].push({

            id: socket.id,
            usuario: usuario
        });

        console.log(
            "Jugadores en sala",
            codigoMesa,
            salas[codigoMesa]
        );

        // actualizar realtime
        io.to(codigoMesa).emit(
            "actualizarJugadores",
            salas[codigoMesa]
        );

        // crear partida
        if (salas[codigoMesa].length === 2) {

            const baraja = crearBaraja();

            partidas[codigoMesa] = {

                turno: 0,

                jugadores: [

                    {
                        nombre: salas[codigoMesa][0].usuario,
                        mano: [
                            sacarCarta(baraja),
                            sacarCarta(baraja)
                        ],
                        plantado: false
                    },

                    {
                        nombre: salas[codigoMesa][1].usuario,
                        mano: [
                            sacarCarta(baraja),
                            sacarCarta(baraja)
                        ],
                        plantado: false
                    }
                ],

                crupier: [
                    sacarCarta(baraja),
                    sacarCarta(baraja)
                ],

                baraja: baraja
            };

            io.to(codigoMesa).emit(
                "partidaIniciada",
                partidas[codigoMesa]
            );

            console.log(
                "Partida creada:",
                codigoMesa
            );
        }

        // desconexión
        socket.on("disconnect", () => {

            if (salas[codigoMesa]) {

                salas[codigoMesa] =
                    salas[codigoMesa].filter(

                        jugador =>
                            jugador.id !== socket.id
                    );

                io.to(codigoMesa).emit(
                    "actualizarJugadores",
                    salas[codigoMesa]
                );

                if (
                    salas[codigoMesa].length === 0
                ) {

                    delete salas[codigoMesa];
                    delete partidas[codigoMesa];
                }
            }

            console.log(
                "Usuario desconectado"
            );
        });
    });


    // PEDIR CARTA
    socket.on("pedirCarta", (datos) => {
        console.log(datos);
        const codigoMesa =
            datos.codigoMesa;

        const usuario =
            datos.usuario;

        const partida =
            partidas[codigoMesa];

        if (!partida) return;

        // comprobar turno
        if (

            partida.jugadores[
                partida.turno
            ].nombre !== usuario

        ) {

            return;
        }

        // buscar jugador
        const jugador =
            partida.jugadores.find(

                j => j.nombre === usuario
            );

        if (!jugador) return;

        // sacar carta
        const carta =
            sacarCarta(partida.baraja);

        jugador.mano.push(carta);

        // comprobar si se pasa
        const total =
            calcularPuntos(jugador.mano);

        if (total > 21) {

            jugador.plantado = true;
        }

        // comprobar si todos terminaron
        const todosPlantados =
            partida.jugadores.every(

                j => j.plantado
            );

        // CRUPIER JUEGA
        if (todosPlantados) {

            while (

                calcularPuntos(
                    partida.crupier
                ) < 17

            ) {

                partida.crupier.push(
                    sacarCarta(
                        partida.baraja
                    )
                );
            }

            io.to(codigoMesa).emit(
                "partidaTerminada",
                partida
            );

            return;
        }

        // siguiente turno
        do {

            partida.turno =
                (partida.turno + 1) % 2;

        } while (

            partida.jugadores[
                partida.turno
            ].plantado
        );

        io.to(codigoMesa).emit(
            "actualizarPartida",
            partida
        );

        console.log(
            usuario,
            "pidió carta"
        );
    });


    // PLANTARSE
    socket.on("plantarse", (datos) => {

        const codigoMesa =
            datos.codigoMesa;

        const usuario =
            datos.usuario;

        const partida =
            partidas[codigoMesa];

        if (!partida) return;

        // comprobar turno
        if (

            partida.jugadores[
                partida.turno
            ].nombre !== usuario

        ) {

            return;
        }

        // buscar jugador
        const jugador =
            partida.jugadores.find(

                j => j.nombre === usuario
            );

        if (!jugador) return;

        jugador.plantado = true;

        // comprobar si todos terminaron
        const todosPlantados =
            partida.jugadores.every(

                j => j.plantado
            );

        // CRUPIER JUEGA
        if (todosPlantados) {

            while (

                calcularPuntos(
                    partida.crupier
                ) < 17

            ) {

                partida.crupier.push(
                    sacarCarta(
                        partida.baraja
                    )
                );
            }

            io.to(codigoMesa).emit(
                "partidaTerminada",
                partida
            );

            return;
        }

        // siguiente turnoF
        do {

            partida.turno =
                (partida.turno + 1) % 2;

        } while (

            partida.jugadores[
                partida.turno
            ].plantado
        );

        io.to(codigoMesa).emit(
            "actualizarPartida",
            partida
        );

        console.log(
            usuario,
            "se plantó"
        );
    });
});


// puerto render
const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {

    console.log(
        "Servidor corriendo en puerto " + PORT
    );
});