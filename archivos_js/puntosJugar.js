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