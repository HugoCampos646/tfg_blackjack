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

const salas = {};

io.on("connection", (socket) => {

    console.log("Usuario conectado");


    socket.on("unirseMesa", (datos) => {

        const codigoMesa = datos.codigo;
        const usuario = datos.usuario;

        socket.join(codigoMesa);

        // crear sala si no existe
        if (!salas[codigoMesa]) {

            salas[codigoMesa] = [];
        }

        // evitar duplicados
        const existe = salas[codigoMesa]
            .find(j => j.id === socket.id);

        if (!existe) {

            salas[codigoMesa].push({
                id: socket.id,
                usuario: usuario
            });
        }

        // máximo 2
        if (salas[codigoMesa].length > 2) {

            salas[codigoMesa].pop();

            socket.emit("mesaLlena");

            return;
        }

        io.to(codigoMesa).emit(
            "actualizarJugadores",
            salas[codigoMesa]
        );

        console.log(
            "Jugadores sala",
            codigoMesa,
            salas[codigoMesa].length
        );
    });


    socket.on("disconnect", () => {

        for (let codigo in salas) {

            salas[codigo] =
                salas[codigo].filter(
                    j => j.id !== socket.id
                );

            io.to(codigo).emit(
                "actualizarJugadores",
                salas[codigo]
            );
        }
    });
});


// puerto render
const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {

    console.log("Servidor corriendo en puerto " + PORT);
});