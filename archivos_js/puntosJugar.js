import { usuario, cargarTopBar } from "./cargaTopBar.js";

const volverBtn = document.getElementById("volver");
const jugarBtn = document.getElementById("jugar");
const inputPuntos = document.getElementById("puntosJugar");
const errores = document.getElementById("errores");

if (!usuario) {
    window.location.href = "../index.html";
}

// cargar topbar
cargarTopBar();

// botón volver
volverBtn.addEventListener("click", () => {
    window.location.href = "../archivos_html/principal.html";
});

jugarBtn.addEventListener("click", () => {
    // comprobaciones
    window.location.href = "../archivos_html/jugar.html";
});
