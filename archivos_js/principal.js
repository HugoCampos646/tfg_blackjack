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

// animación de partículas en el fondo
const contenedorParticulas = document.querySelector(".particulas");

for (let i = 0; i < 35; i++) {

    const particula =
        document.createElement("span");

    particula.style.left =
        Math.random() * 100 + "vw";

    particula.style.animationDuration =
        6 + Math.random() * 8 + "s";

    particula.style.animationDelay =
        Math.random() * 5 + "s";

    particula.style.opacity =
        Math.random();

    const tamaño =
        3 + Math.random() * 6;

    particula.style.width =
        tamaño + "px";

    particula.style.height =
        tamaño + "px";

    contenedorParticulas.appendChild(
        particula
    );
}