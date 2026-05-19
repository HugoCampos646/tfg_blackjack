const partida =
    JSON.parse(
        localStorage.getItem(
            "partidaOnline"
        )
    );

console.log(partida);

import { API_URL } from "./config.js";

const usuario =
    localStorage.getItem("usuario");

const apuesta =
    parseInt(
        localStorage.getItem("apuesta")
    ) || 0;

let puntosUsuario =
    parseInt(
        localStorage.getItem("puntos")
    ) || 0;


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


// comprobar usuario
if (!usuario) {

    window.location.href =
        "../index.html";
}


// TOP BAR
nombreUsuario.innerText =
    usuario;

puntosTotales.innerText =
    puntosUsuario;

apuestaTexto.innerText =
    apuesta;


// jugadores
const jugador1 =
    partida.jugadores[0];

const jugador2 =
    partida.jugadores[1];


// nombres
nombreJugador1.innerText =
    jugador1.nombre;

nombreJugador2.innerText =
    jugador2.nombre;


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
        jugador1.mano
    );

    puntosJugador1Text.innerText =
        "Puntos: " +
        calcularPuntos(jugador1.mano);

    // jugador 2
    mostrarMano(
        manoJugador2Div,
        jugador2.mano
    );

    puntosJugador2Text.innerText =
        "Puntos: " +
        calcularPuntos(jugador2.mano);

    // crupier vacío de momento
    manoCrupierDiv.innerHTML = "";

    puntosCrupierText.innerText =
        "Puntos: ?";
}


// SABER SI ES MI TURNO
function esMiTurno() {

    return (
        partida.jugadores[
            partida.turno
        ].nombre === usuario
    );
}


// ACTUALIZAR BOTONES
function actualizarTurno() {

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


// INICIAR
function iniciarJuego() {

    mostrarCartas();

    actualizarTurno();
}

iniciarJuego();


// PEDIR CARTA
pedirBtn.addEventListener(
    "click",
    () => {

        if (
            juegoTerminado ||
            !esMiTurno()
        ) return;

        const miJugador =
            partida.jugadores.find(

                j => j.nombre === usuario
            );

        // sacar carta de la baraja común
        const carta =
            partida.baraja.pop();

        miJugador.mano.push(carta);

        // comprobar puntos
        const puntos =
            calcularPuntos(
                miJugador.mano
            );

        // si se pasa
        if (puntos > 21) {

            miJugador.plantado = true;
        }

        // cambiar turno
        partida.turno =
            (partida.turno + 1) % 2;

        mostrarCartas();

        actualizarTurno();
    }
);


// PLANTARSE
plantarseBtn.addEventListener(
    "click",
    () => {

        if (
            juegoTerminado ||
            !esMiTurno()
        ) return;

        const miJugador =
            partida.jugadores.find(

                j => j.nombre === usuario
            );

        miJugador.plantado = true;

        // cambiar turno
        partida.turno =
            (partida.turno + 1) % 2;

        mostrarCartas();

        actualizarTurno();

        // si ambos plantados termina
        if (

            jugador1.plantado &&
            jugador2.plantado

        ) {

            terminarPartida();
        }
    }
);


// TERMINAR
function terminarPartida() {

    juegoTerminado = true;

    pedirBtn.disabled = true;

    plantarseBtn.disabled = true;

    const puntos1 =
        calcularPuntos(
            jugador1.mano
        );

    const puntos2 =
        calcularPuntos(
            jugador2.mano
        );

    let ganador = null;

    // ambos se pasan
    if (
        puntos1 > 21 &&
        puntos2 > 21
    ) {

        resultadoText.innerText =
            "Ambos pierden";

        return;
    }

    // gana jugador 1
    if (
        (puntos1 <= 21 && puntos2 > 21)
        ||
        (puntos1 <= 21 &&
         puntos1 > puntos2)
    ) {

        ganador =
            jugador1.nombre;
    }

    // gana jugador 2
    else if (
        (puntos2 <= 21 && puntos1 > 21)
        ||
        (puntos2 <= 21 &&
         puntos2 > puntos1)
    ) {

        ganador =
            jugador2.nombre;
    }

    // empate
    else {

        resultadoText.innerText =
            "Empate";

        return;
    }

    resultadoText.innerText =
        "Ganador: " + ganador;
}


// VOLVER
volverMenuBtn.addEventListener(
    "click",
    () => {

        window.location.href =
            "../archivos_html/principal.html";
    }
);