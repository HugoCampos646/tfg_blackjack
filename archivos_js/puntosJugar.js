import { usuario, cargarTopBar } from "./cargaTopBar.js";

const volverBtn = document.getElementById("volver");
const jugarBtn = document.getElementById("jugar");

const inputPuntos = document.getElementById("puntosJugar");

const errores = document.getElementById("errores");

let puntosUsuario = 0;

if (!usuario) {
    window.location.href = "../index.html";
}

// cargar topbar
cargarTopBar().then((puntos) => {
    puntosUsuario = puntos;
});

// botón volver
volverBtn.addEventListener("click", () => {
    window.location.href = "../archivos_html/principal.html";
});

// jugar
jugarBtn.addEventListener("click", () => {

    errores.innerText = "";

    const apuesta = parseInt(inputPuntos.value);

    // comprobar número
    if (isNaN(apuesta)) {
        errores.innerText = "Introduce un número válido";
        return;
    }

    // comprobar mayor que 0
    if (apuesta <= 0) {
        errores.innerText = "La apuesta debe ser mayor que 0";
        return;
    }

    // comprobar suficientes puntos
    if (apuesta > puntosUsuario) {
        errores.innerText = "No tienes suficientes puntos";
        return;
    }

    // guardar apuesta
    localStorage.setItem("apuesta", apuesta);

    // guardar puntos actuales
    localStorage.setItem("puntos", puntosUsuario);

    // ir al juego
    window.location.href = "../archivos_html/jugar.html";
});