import { API_URL } from "./config.js";

const nombre = document.getElementById("nombre");
const contraseña = document.getElementById("contraseña");
const btnAceptar = document.getElementById("btnAceptar");
const btnMenu = document.getElementById("btnMenu");
const errores = document.getElementById("errores");
const info = document.getElementById("info");

btnMenu.addEventListener("click", () => {
    window.location.href = "../index.html";
});

btnAceptar.addEventListener("click", () => {
    comprobaciones();
});

async function comprobaciones() {

    const nombreVal = nombre.value.trim();
    const passVal = contraseña.value.trim();

    if (!nombreVal || !passVal) {
        errores.innerHTML = "Por favor, completa todos los campos.";
        return;
    }

    try {

        info.innerHTML = "Conectando con el servidor, espera un momento.";

        const response = await fetch(`${API_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombreVal,
                password: passVal
            })
        });

        const data = await response.json();

        if (data.success) {

            // guardar usuario en el navegador
            localStorage.setItem("usuario", nombreVal);
            info.innerHTML = "Sesión iniciada correctamente";
            window.location.href = "../archivos_html/principal.html";

        } else {
            errores.innerHTML = data.mensaje;
        }

    } catch (error) {
        errores.innerHTML = "Error al conectar con el servidor.";
    }
}

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