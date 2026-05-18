import { API_URL } from "./config.js";

const socket = io(API_URL);

const codigoMesa = localStorage.getItem("codigoMesa");

const usuario = localStorage.getItem("usuario");

const codigoMesaText = document.getElementById("codigoMesa");

const jugador1Text = document.getElementById("jugador1");

const jugador2Text = document.getElementById("jugador2");

const estadoMesa = document.getElementById("estadoMesa");

const empezarBtn = document.getElementById("empezar");

const apuestaMesa = document.getElementById("apuestaMesa");


apuestaMesa.innerText = localStorage.getItem("apuesta");

codigoMesaText.innerText = codigoMesa;

jugador1Text.innerText =
    "Jugador 1: " + usuario;


// unirse
socket.emit("unirseMesa", {
    codigo: codigoMesa,
    usuario: usuario
});

console.log("Uniéndose a sala:", codigoMesa);


// actualizar jugadores realtime
socket.on("actualizarJugadores", (jugadores) => {

    console.log("Jugadores recibidos:", jugadores);

    estadoMesa.innerText =
        jugadores.length + " / 2 jugadores";

    // jugador 1
    if (jugadores[0]) {

        jugador1Text.innerText =
            jugadores[0].usuario;

    } else {

        jugador1Text.innerText =
            "Esperando jugador...";
    }

    // jugador 2
    if (jugadores[1]) {

        jugador2Text.innerText =
            jugadores[1].usuario;

        empezarBtn.disabled = false;

    } else {

        jugador2Text.innerText =
            "Esperando jugador...";

        empezarBtn.disabled = true;
    }
});


// sala llena
socket.on("mesaLlena", () => {

    alert("La mesa está llena");
});