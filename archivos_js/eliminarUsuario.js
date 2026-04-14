import { cargarTopBar } from "./cargaTopBar.js";

const volverBtn = document.getElementById("volver");

cargarTopBar();

volverBtn.addEventListener("click", () => {
    window.location.href = "../archivos_html/perfil.html";
});