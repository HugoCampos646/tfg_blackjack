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

    if (!carta) return 0;

    if (carta.valor >= 11) {
        return 10;
    }

    if (carta.valor === 1) {
        return 11;
    }

    return carta.valor;
}


// CALCULAR PUNTOS
function calcularPuntos(mano) {

    let total = 0;

    let ases = 0;

    for (let carta of mano) {

        total += valorCarta(carta);

        if (carta.valor === 1) {
            ases++;
        }
    }

    while (total > 21 && ases > 0) {

        total -= 10;
        ases--;
    }

    return total;
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
    mostrarMano(
        manoCrupierDiv,
        partida.crupier
    );

    puntosCrupierText.innerText =
        "Puntos: " +
        calcularPuntos(
            partida.crupier
        );
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
function terminarPartida() {

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

    let ganador = null;

    // gana jugador 1
    if (

        puntos1 <= 21
        &&
        (
            puntosCrupier > 21
            ||
            puntos1 > puntosCrupier
        )
        &&
        (
            puntos1 >= puntos2
            || puntos2 > 21
        )

    ) {

        ganador =
            partida.jugadores[0].nombre;
    }

    // gana jugador 2
    else if (

        puntos2 <= 21
        &&
        (
            puntosCrupier > 21
            ||
            puntos2 > puntosCrupier
        )
        &&
        (
            puntos2 >= puntos1
            || puntos1 > 21
        )

    ) {

        ganador =
            partida.jugadores[1].nombre;
    }

    // gana crupier
    else {

        resultadoText.innerText =
            "Gana el crupier";

        volverMenuBtn.disabled = false;
        volverMenuBtn.classList.remove("oculto");

        return;
    }

    resultadoText.innerText =
        "Ganador: " + ganador;

    volverMenuBtn.disabled = false;
    volverMenuBtn.classList.remove("oculto");
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
    (nuevaPartida) => {

        partida.jugadores =
            nuevaPartida.jugadores;

        partida.turno =
            nuevaPartida.turno;

        partida.baraja =
            nuevaPartida.baraja;

        partida.crupier =
            nuevaPartida.crupier;

        actualizarNombres();
        mostrarCartas();
        actualizarTurno();
    }
);


// PARTIDA TERMINADA
socket.on(
    "partidaTerminada",
    (nuevaPartida) => {

        partida.jugadores =
            nuevaPartida.jugadores;

        partida.crupier =
            nuevaPartida.crupier;

        mostrarCartas();

        terminarPartida();
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