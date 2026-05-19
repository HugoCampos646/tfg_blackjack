import { API_URL } from "./config.js";

const socket = io(API_URL);

const codigoMesa =
    localStorage.getItem("codigoMesa");

const usuario =
    localStorage.getItem("usuario");

const codigoMesaText =
    document.getElementById("codigoMesa");

const jugador1Text =
    document.getElementById("jugador1");

const jugador2Text =
    document.getElementById("jugador2");

const estadoMesa =
    document.getElementById("contadorJugadores");

const empezarBtn =
    document.getElementById("empezar");

const apuestaMesa =
    document.getElementById("apuestaMesa");


// apuesta
apuestaMesa.innerText =
    localStorage.getItem("apuesta");

// código
codigoMesaText.innerText =
    codigoMesa;


// unirse a sala
socket.emit("unirseMesa", {

    codigo: codigoMesa,
    usuario: usuario
});

console.log(
    "Uniéndose a sala:",
    codigoMesa
);


// actualizar realtime
socket.on(
    "actualizarJugadores",
    (jugadores) => {

        console.log(
            "Jugadores recibidos:",
            jugadores
        );

        // contador
        estadoMesa.innerText =
            jugadores.length + " / 2 jugadores";

        // jugador 1
        if (jugadores[0]) {

            jugador1Text.innerText =
                jugadores[0].usuario;

        } else {

            jugador1Text.innerText =
                "Esperando...";
        }

        // jugador 2
        if (jugadores[1]) {

            jugador2Text.innerText =
                jugadores[1].usuario;

            empezarBtn.style.display = "none";

        } else {

            jugador2Text.innerText =
                "Esperando...";

            empezarBtn.style.display = "none";
        }
    }
);


// sala llena
socket.on("mesaLlena", () => {

    alert("La mesa está llena");

    window.location.href =
        "../archivos_html/online.html";
});

// partida iniciada
socket.on("partidaIniciada", (partida) => {

    console.log("PARTIDA:", partida);

    localStorage.setItem(
        "partidaOnline",
        JSON.stringify(partida)
    );

    window.location.href =
        "../archivos_html/jugarOnline.html";
});