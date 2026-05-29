import { usuario, cargarTopBar } from "./cargaTopBar.js";

if (!usuario) {
    window.location.href = "../index.html";
}

// cargar top bar
cargarTopBar();

document.getElementById("tutorialBasico").addEventListener("click", () => {
    window.location.href = "../archivos_html/tutorial.html";
});

document.getElementById("tutorialAs").addEventListener("click", () => {
    window.location.href = "../archivos_html/tutorialAs.html";
});

document.getElementById("tutorialConsejos").addEventListener("click", () => {
    window.location.href = "../archivos_html/tutorialConsejos.html";
});


// partículas
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