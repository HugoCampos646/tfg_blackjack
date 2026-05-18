import { API_URL } from "./config.js";

const socket = io(API_URL);

const codigoMesa = localStorage.getItem("codigoMesa");

const usuario = localStorage.getItem("usuario");

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


// guardar nombres localmente
sessionStorage.setItem(
    codigoMesa + "_jugador",
    usuario
);


// unirse
socket.emit("unirseMesa", codigoMesa);

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

        estadoMesa.innerText =
            jugadores.length + " / 2 jugadores";

        // jugador 1
        jugador1Text.innerText =
            usuario;

        // jugador 2
        if (jugadores === 1) {

            jugador2Text.innerText =
                "Esperando jugador...";

            empezarBtn.disabled = true;
        }

        if (jugadores === 2) {

            jugador2Text.innerText =
                "Jugador conectado";

            empezarBtn.disabled = false;
        }
    }
);


// sala llena
socket.on("mesaLlena", () => {

    alert("La mesa está llena");

    window.location.href =
        "../archivos_html/online.html";
});