import { API_URL } from "./config.js";

const socket = io(API_URL);

const codigoMesa = localStorage.getItem("codigoMesa");

const usuario = localStorage.getItem("usuario");

const codigoMesaText = document.getElementById("codigoMesa");

const jugador1Text = document.getElementById("jugador1");

const jugador2Text = document.getElementById("jugador2");

const estadoMesa = document.getElementById("estadoMesa");

const empezarBtn = document.getElementById("empezar");


codigoMesaText.innerText = codigoMesa;

jugador1Text.innerText =
    "Jugador 1: " + usuario;


// unirse
socket.emit("unirseMesa", codigoMesa);
console.log("Uniéndose a sala:", codigoMesa);


// actualizar jugadores realtime
socket.on("actualizarJugadores", (cantidad) => {

    console.log("Jugadores recibidos:", cantidad);
    estadoMesa.innerText =
        cantidad + " / 2 jugadores";

    if (cantidad === 1) {

        jugador2Text.innerText =
            "Esperando jugador...";

        empezarBtn.disabled = true;
    }

    if (cantidad === 2) {

        jugador2Text.innerText =
            "Jugador 2 conectado";

        empezarBtn.disabled = false;
    }
});


// sala llena
socket.on("mesaLlena", () => {

    alert("La mesa está llena");
});