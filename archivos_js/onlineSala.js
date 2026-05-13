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


// unirse socket
socket.emit("unirseMesa", codigoMesa);


// detectar segundo jugador
socket.on("jugadorUnido", () => {

    jugador2Text.innerText =
        "Jugador 2 conectado";

    estadoMesa.innerText =
        "2 / 2 jugadores";

    empezarBtn.disabled = false;
});