import { usuario, cargarTopBar } from "./cargaTopBar.js";
import { API_URL } from "./config.js";

const volverBtn = document.getElementById("volver");
const errores = document.getElementById("errores");

if (!usuario) {
    window.location.href = "../index.html";
}

// cargar topbar
cargarTopBar();

// volver
volverBtn.addEventListener("click", () => {
    window.location.href = "principal.html";
});

// cargar estadísticas
async function cargarEstadisticas() {

    try {
        const response = await fetch(`${API_URL}/api/estadisticas?usuario=` + usuario);
        const data = await response.json();

        if (!data.success) {
            errores.innerText = "Error al cargar estadísticas";
            return;
        }

        const stats = data.estadisticas;

        // básicos
        document.getElementById("jugadas").innerText = stats.numero_partidas;
        document.getElementById("ganadas").innerText = stats.partidas_ganadas;
        document.getElementById("perdidas").innerText = stats.partidas_perdidas;
        document.getElementById("empatadas").innerText = stats.partidas_empatadas;

        // porcentajes
        const total = stats.numero_partidas || 1;

        document.getElementById("porcentajeGanadas").innerText =
            ((stats.partidas_ganadas / total) * 100).toFixed(1) + "%";

        document.getElementById("porcentajePerdidas").innerText =
            ((stats.partidas_perdidas / total) * 100).toFixed(1) + "%";

        document.getElementById("porcentajeEmpatadas").innerText =
            ((stats.partidas_empatadas / total) * 100).toFixed(1) + "%";

            
        let nivel = "Principiante";

        if (stats.numero_partidas >= 50) {
            nivel = "Experto";
        } else if (stats.numero_partidas >= 10) {
            nivel = "Intermedio";
        }

        document.getElementById("nivel").innerText = nivel;

        errores.innerText = "";

    } catch (error) {
        errores.innerText = "Error de conexión";
    }
}

cargarEstadisticas();