import { usuario, cargarTopBar } from "./cargaTopBar.js";

const botonPerfil = document.getElementById("botonPerfil");
const botonEstadisticas = document.getElementById("botonEstadisticas");
const botonTutorial = document.getElementById("botonTutorial");
const botonOnline = document.getElementById("botonOnline");
const botonJugar = document.getElementById("botonJugar");
const botonIngresarPuntos = document.getElementById("botonIngresarPuntos");

if (!usuario) {
    window.location.href = "../index.html";
}

// cargar datos del top bar
cargarTopBar();

// Event listener para las rutas de los botones

botonPerfil.addEventListener("click", function() {
    window.location.href = "../archivos_html/perfil.html";
});

botonTutorial.addEventListener("click", function() {
    window.location.href = "../archivos_html/tutorial.html";
});

botonJugar.addEventListener("click", function() {
    window.location.href = "../archivos_html/puntosJugar.html";
});

botonOnline.addEventListener("click", function() {
    window.location.href = "../archivos_html/online.html";
});

botonEstadisticas.addEventListener("click", function() {
    window.location.href = "../archivos_html/estadisticas.html";
});

botonIngresarPuntos.addEventListener("click", function() {
    window.location.href = "../archivos_html/ingresarPuntos.html";
});