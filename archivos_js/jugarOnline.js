import { API_URL } from "./config.js";

const socket = io(API_URL);

const codigoMesa =
    localStorage.getItem("codigoMesa");

const partida =
    JSON.parse(
        localStorage.getItem(
            "partidaOnline"
        )
    );

const usuario =
    localStorage.getItem("usuario");

if (!partida) {
    window.location.href =
        "../archivos_html/online.html";
}

const apuesta =
    parseInt(
        localStorage.getItem("apuesta")
    ) || 0;

let puntosUsuario =
    parseInt(
        localStorage.getItem("puntos")
    ) || 0;


socket.on("connect", () => {

    console.log("SOCKET CONECTADO");

    // Unirse a la room para recibir eventos
    console.log("jugarOnline: emit joinPartida", { codigoMesa, usuario, partida });
    socket.emit("joinPartida", {
        codigo: codigoMesa,
        usuario: usuario
    });
});

// TOP BAR
const nombreUsuario =
    document.getElementById("nombreUsuario");

const puntosTotales =
    document.getElementById("puntosTotales");

const apuestaTexto =
    document.getElementById("apuestaTexto");


// CRUPIER
const manoCrupierDiv =
    document.getElementById("manoCrupier");

const puntosCrupierText =
    document.getElementById("puntosCrupier");


// JUGADOR 1
const manoJugador1Div =
    document.getElementById("manoJugador1");

const puntosJugador1Text =
    document.getElementById("puntosJugador1");

const nombreJugador1 =
    document.getElementById("nombreJugador1");


// JUGADOR 2
const manoJugador2Div =
    document.getElementById("manoJugador2");

const puntosJugador2Text =
    document.getElementById("puntosJugador2");

const nombreJugador2 =
    document.getElementById("nombreJugador2");


// RESULTADO
const resultadoText =
    document.getElementById("resultado");


// BOTONES
const pedirBtn =
    document.getElementById("pedir");

const plantarseBtn =
    document.getElementById("plantarse");

const volverMenuBtn =
    document.getElementById("volverMenu");


let juegoTerminado = false;

// PARA CONTROLAR LA ANIMACION DE LA CARTA
let cartasJugador1 = partida.jugadores?.[0]?.mano.length || 0;
let cartasJugador2 = partida.jugadores?.[1]?.mano.length || 0;
let cartasCrupier = partida.crupier?.length || 0;

// GUARDAR PUNTOS EN BD
async function guardarPuntos() {

    try {

        await fetch(`${API_URL}/api/actualizarPuntos`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                usuario: usuario,
                puntos: puntosUsuario
            })

        });

        localStorage.setItem(
            "puntos",
            puntosUsuario
        );

        puntosTotales.innerText =
            puntosUsuario;

        console.log(
            "Puntos guardados:",
            puntosUsuario
        );

    } catch (error) {

        console.log(
            "Error al guardar puntos",
            error
        );
    }
}

// GUARDAR ESTADÍSTICAS
async function guardarEstadisticas(resultado) {

    try {

        let puntosGanados = 0;

        if (resultado === "ganada") {

            puntosGanados = apuesta;
        }

        await fetch(`${API_URL}/api/actualizarEstadisticas`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                usuario: usuario,
                resultado: resultado,
                puntosGanados: puntosGanados
            })
        });

        console.log(
            "Estadísticas guardadas"
        );

    } catch (error) {

        console.log(
            "Error al guardar estadísticas",
            error
        );
    }
}

volverMenuBtn.disabled = true;


// comprobar usuario
if (!usuario) {

    window.location.href = "../index.html";
}


// TOP BAR
nombreUsuario.innerText = usuario;

puntosTotales.innerText = puntosUsuario;

apuestaTexto.innerText = apuesta;


// nombres
function actualizarNombres() {
    nombreJugador1.innerText =
        partida.jugadores?.[0]?.nombre || "Jugador 1";

    nombreJugador2.innerText =
        partida.jugadores?.[1]?.nombre || "Jugador 2";
}

actualizarNombres();


// VALOR CARTA
function valorCarta(carta) {

    if (!carta || carta.valor == null) return 0;

    const valor = Number(carta.valor);

    if (valor >= 11) {
        return 10;
    }

    if (valor === 1) {
        return 11;
    }

    return valor;
}


// CALCULAR PUNTOS
function calcularPuntos(mano) {

    let total = 0;

    let ases = 0;

    for (let carta of mano) {

        const valor = Number(carta?.valor ?? 0);

        total += valorCarta(carta);

        if (valor === 1) {
            ases++;
        }
    }

    while (total > 21 && ases > 0) {

        total -= 10;
        ases--;
    }

    return total;
}

// ANIMACIÓN CARTA
function animarCarta(destinoDiv) {

    return new Promise(resolve => {

        const cartaAnimada = document.createElement("img");

        cartaAnimada.classList.add("cartaAnimada");

        cartaAnimada.src = "../assets/cartas/Back-R.png";

        cartaAnimada.style.left = "20px";

        cartaAnimada.style.top = "20px";

        document.body.appendChild(
            cartaAnimada
        );

        const rect =
            destinoDiv.getBoundingClientRect();

        setTimeout(() => {

            cartaAnimada.style.left =
                rect.left + rect.width / 2 + "px";

            cartaAnimada.style.top =
                rect.top + "px";

        }, 50);

        setTimeout(() => {

            cartaAnimada.remove();

            resolve();

        }, 600);
    });
}


// MOSTRAR MANO
function mostrarMano(div, mano) {

    div.innerHTML = "";

    mano.forEach(carta => {

        const img =
            document.createElement("img");

        img.src =
            `../assets/cartas/${carta.palo}-${carta.valor}.png`;

        img.width = 80;

        div.appendChild(img);
    });
}


// MOSTRAR TODO
async function animarCartasNuevas(div, cantidad) {

    if (cantidad <= 0) return;

    const imgs = div.querySelectorAll("img");

    for (let i = 0; i < cantidad; i++) {

        const idx = imgs.length - cantidad + i;

        const target = imgs[idx];

        if (!target) continue;

        target.style.opacity = 0;

        await animarCarta(target);

        target.style.opacity = 1;
    }
}


function mostrarCartas() {

    // jugador 1
    mostrarMano(
        manoJugador1Div,
        partida.jugadores[0].mano
    );

    puntosJugador1Text.innerText =
        "Puntos: " +
        calcularPuntos(partida.jugadores[0].mano);

    // jugador 2
    mostrarMano(
        manoJugador2Div,
        partida.jugadores[1].mano
    );

    puntosJugador2Text.innerText =
        "Puntos: " +
        calcularPuntos(partida.jugadores[1].mano);

    // crupier
    manoCrupierDiv.innerHTML = "";

    partida.crupier.forEach((carta, index) => {

        const img =
            document.createElement("img");

        // ocultar segunda carta
        if (
            index === 1
            &&
            !juegoTerminado
        ) {

            img.src =
                "../assets/cartas/Back-R.png";

        } else {

            img.src =
                `../assets/cartas/${carta.palo}-${carta.valor}.png`;
        }

        img.width = 80;

        manoCrupierDiv.appendChild(img);
    });


    // puntos crupier
    if (juegoTerminado) {

        puntosCrupierText.innerText =
            "Puntos: " +
            calcularPuntos(
                partida.crupier
            );

    } else {

        puntosCrupierText.innerText =
            "Puntos: ?";
    }
}


// SABER SI ES MI TURNO
function esMiTurno() {

    return (
        partida.jugadores?.[partida.turno]?.nombre?.trim() ===
        usuario?.trim()
    );
}


// ACTUALIZAR BOTONES
function actualizarTurno() {

    if (juegoTerminado) return;

    if (esMiTurno()) {

        pedirBtn.disabled = false;

        plantarseBtn.disabled = false;

        resultadoText.innerText =
            "Es tu turno";

    } else {

        pedirBtn.disabled = true;

        plantarseBtn.disabled = true;

        resultadoText.innerText =
            "Turno de " +
            partida.jugadores[
                partida.turno
            ].nombre;
    }
}


// TERMINAR
async function terminarPartida() {

    juegoTerminado = true;

    pedirBtn.disabled = true;

    plantarseBtn.disabled = true;

    const puntos1 =
        calcularPuntos(
            partida.jugadores[0].mano
        );

    const puntos2 =
        calcularPuntos(
            partida.jugadores[1].mano
        );

    const puntosCrupier =
        calcularPuntos(
            partida.crupier
        );

    const jugador1 = {
        nombre: partida.jugadores[0].nombre,
        puntos: puntos1
    };

    const jugador2 = {
        nombre: partida.jugadores[1].nombre,
        puntos: puntos2
    };

    function resultadoJugador(jugadorPuntos) {

        if (jugadorPuntos > 21) {
            return "pierde";
        }

        if (puntosCrupier > 21) {
            return "gana";
        }

        if (jugadorPuntos > puntosCrupier) {
            return "gana";
        }

        if (jugadorPuntos === puntosCrupier) {
            return "empata";
        }

        return "pierde";
    }

    const resultado1 =
        resultadoJugador(jugador1.puntos);

    const resultado2 =
        resultadoJugador(jugador2.puntos);

    // ACTUALIZAR PUNTOS DEL USUARIO ACTUAL
    if (usuario === jugador1.nombre) {

        if (resultado1 === "gana") {
            puntosUsuario += apuesta;
        }

        else if (resultado1 === "pierde") {
            puntosUsuario -= apuesta;
        }
    }

    else if (usuario === jugador2.nombre) {

        if (resultado2 === "gana") {
            puntosUsuario += apuesta;
        }

        else if (resultado2 === "pierde") {
            puntosUsuario -= apuesta;
        }
    }

    // GUARDAR ESTADÍSTICAS DEL USUARIO ACTUAL
    if (usuario === jugador1.nombre) {

        if (resultado1 === "gana") {

            await guardarEstadisticas(
                "ganada"
            );

        } else if (
            resultado1 === "pierde"
        ) {

            await guardarEstadisticas(
                "perdida"
            );

        } else {

            await guardarEstadisticas(
                "empate"
            );
        }
    }

    else if (usuario === jugador2.nombre) {

        if (resultado2 === "gana") {

            await guardarEstadisticas(
                "ganada"
            );

        } else if (
            resultado2 === "pierde"
        ) {

            await guardarEstadisticas(
                "perdida"
            );

        } else {

            await guardarEstadisticas(
                "empate"
            );
        }
    }

    // GUARDAR PUNTOS
    await guardarPuntos();

    const partes = [];

    if (
        resultado1 === "gana"
        &&
        resultado2 === "gana"
    ) {

        resultadoText.innerText =
            "Ganadores: "
            + jugador1.nombre
            + " y "
            + jugador2.nombre;
    }

    else if (
        resultado1 === "empata"
        &&
        resultado2 === "empata"
    ) {

        resultadoText.innerText =
            "Empate: "
            + jugador1.nombre
            + " y "
            + jugador2.nombre;
    }

    else if (
        resultado1 === "pierde"
        &&
        resultado2 === "pierde"
    ) {

        resultadoText.innerText =
            "Pierden: "
            + jugador1.nombre
            + " y "
            + jugador2.nombre;
    }

    else {

        if (resultado1 === "gana") {

            partes.push(
                jugador1.nombre + " gana"
            );

        } else if (
            resultado1 === "empata"
        ) {

            partes.push(
                jugador1.nombre + " empata"
            );

        } else {

            partes.push(
                jugador1.nombre + " pierde"
            );
        }

        if (resultado2 === "gana") {

            partes.push(
                jugador2.nombre + " gana"
            );

        } else if (
            resultado2 === "empata"
        ) {

            partes.push(
                jugador2.nombre + " empata"
            );

        } else {

            partes.push(
                jugador2.nombre + " pierde"
            );
        }

        resultadoText.innerText =
            partes.join(", ");
    }

    volverMenuBtn.disabled = false;

    volverMenuBtn.classList.remove(
        "oculto"
    );
}


// INICIAR
function iniciarJuego() {

    mostrarCartas();

    actualizarTurno();
}

iniciarJuego();


// ACTUALIZAR PARTIDA
socket.on(
    "actualizarPartida",
    async (nuevaPartida) => {

        console.log(
            "jugarOnline: actualizarPartida recibido",
            nuevaPartida
        );

        // calcular cuántas cartas nuevas llegaron
        const nuevasCartasJugador1 =
            nuevaPartida.jugadores[0].mano.length -
            cartasJugador1;

        const nuevasCartasJugador2 =
            nuevaPartida.jugadores[1].mano.length -
            cartasJugador2;

        // actualizar partida y DOM primero
        partida.jugadores =
            nuevaPartida.jugadores;

        partida.turno =
            nuevaPartida.turno;

        partida.baraja =
            nuevaPartida.baraja;

        partida.crupier =
            nuevaPartida.crupier;

        // actualizar contadores
        cartasJugador1 =
            partida.jugadores[0].mano.length;

        cartasJugador2 =
            partida.jugadores[1].mano.length;

        // renderizar nuevas cartas (las nuevas quedarán ocultas y se mostrarán tras la animación)
        mostrarCartas();

        await animarCartasNuevas(
            manoJugador1Div,
            nuevasCartasJugador1
        );

        await animarCartasNuevas(
            manoJugador2Div,
            nuevasCartasJugador2
        );

        actualizarNombres();

        mostrarCartas();

        actualizarTurno();
    }
);


// PARTIDA TERMINADA
socket.on(
    "partidaTerminada",
    async (nuevaPartida) => {

        const nuevasCartasJugador1 =
            nuevaPartida.jugadores[0].mano.length -
            cartasJugador1;

        const nuevasCartasJugador2 =
            nuevaPartida.jugadores[1].mano.length -
            cartasJugador2;

        const nuevasCartasCrupier =
            nuevaPartida.crupier.length -
            cartasCrupier;

        partida.jugadores =
            nuevaPartida.jugadores;

        partida.crupier =
            nuevaPartida.crupier;

        partida.turno =
            nuevaPartida.turno;

        partida.baraja =
            nuevaPartida.baraja;

        cartasJugador1 =
            partida.jugadores[0].mano.length;

        cartasJugador2 =
            partida.jugadores[1].mano.length;

        cartasCrupier =
            partida.crupier.length;

        juegoTerminado = true;

        mostrarCartas();

        await animarCartasNuevas(
            manoJugador1Div,
            nuevasCartasJugador1
        );

        await animarCartasNuevas(
            manoJugador2Div,
            nuevasCartasJugador2
        );

        await animarCartasNuevas(
            manoCrupierDiv,
            nuevasCartasCrupier
        );

        await terminarPartida();

        mostrarCartas();
    }
);


// PEDIR CARTA
pedirBtn.addEventListener(
    "click",
    () => {
        console.log("CLICK PEDIR");
        socket.emit(
            "pedirCarta",
            {
                codigoMesa,
                usuario
            }
        );
    }
);


// PLANTARSE
plantarseBtn.addEventListener(
    "click",
    () => {
        console.log("CLICK PLANTARSE");
        socket.emit(
            "plantarse",
            {
                codigoMesa,
                usuario
            }
        );
    }
);


// VOLVER
volverMenuBtn.addEventListener(
    "click",
    () => {

        localStorage.removeItem("partidaOnline");
        localStorage.removeItem("codigoMesa");
        localStorage.removeItem("apuesta");

        window.location.href =
            "../archivos_html/principal.html";
    }
);