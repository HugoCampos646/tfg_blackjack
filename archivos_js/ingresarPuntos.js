import { usuario, cargarTopBar } from "./cargaTopBar.js";
import { API_URL } from "./config.js";

const volverBtn = document.getElementById("volver");
const ingresarBtn = document.getElementById("ingresar");
const inputPuntos = document.getElementById("puntosIngresar");
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

// botón ingresar puntos
ingresarBtn.addEventListener("click", async () => {

    const puntos = inputPuntos.value.trim();

    // limpiar errores previos
    errores.innerText = "";

    // VALIDACIONES
    if (!puntos) {
        errores.innerText = "Introduce una cantidad";
        return;
    }

    if (isNaN(puntos)) {
        errores.innerText = "Debe ser un número";
        return;
    }

    const puntosNum = parseInt(puntos);

    if (puntosNum <= 0) {
        errores.innerText = "Debe ser mayor que 0";
        return;
    }

    if (puntosNum > 1000) {
        errores.innerText = "Máximo 1000 puntos";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/ingresarPuntos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario: usuario,
                puntos: puntosNum
            })
        });

        const data = await response.json();

        if (data.success) {
            errores.innerText = ""; // limpiar errores
            inputPuntos.value = ""; // limpiar input

            // recargar topbar para ver nuevos puntos
            cargarTopBar();

        } else {
            errores.innerText = data.mensaje || "Error al ingresar puntos";
        }

    } catch (error) {
        errores.innerText = "Error de conexión con el servidor";
    }
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