import { usuario, cargarTopBar } from "./cargaTopBar.js";

if (!usuario) {
    window.location.href = "../index.html";
}

cargarTopBar();

document.getElementById(
    "tutorialBasico"
).addEventListener("click", () => {

    window.location.href =
        "../archivos_html/tutorialBasico.html";
});

document.getElementById(
    "tutorialAs"
).addEventListener("click", () => {

    window.location.href =
        "../archivos_html/tutorialAs.html";
});

document.getElementById(
    "tutorialConsejos"
).addEventListener("click", () => {

    window.location.href =
        "../archivos_html/tutorialConsejos.html";
});

document.getElementById(
    "volverMenu"
).addEventListener("click", () => {

    window.location.href =
        "../archivos_html/principal.html";
});