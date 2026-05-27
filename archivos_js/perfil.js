import { usuario, cargarTopBar } from "./cargaTopBar.js";
import { API_URL } from "./config.js";

const nombreUsuario = document.getElementById("nombrePerfil");
const puntosUsuario = document.getElementById("puntosPerfil");

const cambiarNombreBtn = document.getElementById("cambiarNombre");
const cambiarContraseñaBtn = document.getElementById("cambiarContraseña");
const cerrarSesionBtn = document.getElementById("cerrarSesion");
const eliminarUsuarioBtn = document.getElementById("eliminarUsuario");
const volverPrincipalBtn = document.getElementById("volverPrincipal");

const errores = document.getElementById("errores");

let modoEdicion = false;

if (!usuario) {
    window.location.href = "../index.html";
}

// INICIALIZAR
nombreUsuario.value = localStorage.getItem("usuario");


// CAMBIAR NOMBRE (modo toggle)
cambiarNombreBtn.addEventListener("click", async () => {

    if (!modoEdicion) {
        // ACTIVAR EDICIÓN
        modoEdicion = true;

        nombreUsuario.disabled = false;
        nombreUsuario.classList.add("editando");
        nombreUsuario.focus();

        cambiarNombreBtn.innerText = "Guardar";

    } else {
        // GUARDAR CAMBIO
        const nuevoNombre = nombreUsuario.value.trim();

        if (!nuevoNombre) {
            errores.innerText = "Nombre no válido";
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/cambiarNombre`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    usuarioActual: localStorage.getItem("usuario"),
                    nuevoNombre: nuevoNombre
                })
            });

            const data = await response.json();

            if (data.success) {

                // limpiar errores
                errores.innerText = "";

                // actualizar localStorage
                localStorage.setItem("usuario", nuevoNombre);

                // actualizar input y topbar
                nombreUsuario.value = nuevoNombre;
                document.getElementById("nombreUsuario").innerText = nuevoNombre;

                // desactivar edición
                modoEdicion = false;
                nombreUsuario.disabled = true;
                nombreUsuario.classList.remove("editando");

                cambiarNombreBtn.innerText = "Cambiar nombre";

            } else {
                errores.innerText = "No se pudo cambiar el nombre";
            }

        } catch (error) {
            errores.innerText = "Error de conexión";
        }
    }
});


// CAMBIAR CONTRASEÑA
cambiarContraseñaBtn.addEventListener("click", () => {
    window.location.href = "cambiarContrasena.html";
});


// ELIMINAR USUARIO
eliminarUsuarioBtn.addEventListener("click", () => {
    window.location.href = "eliminarUsuario.html";
});


// VOLVER A PRINCIPAL
volverPrincipalBtn.addEventListener("click", () => {
    window.location.href = "principal.html";
});


// CARGAR DATOS
cargarTopBar().then((puntos) => {
    puntosUsuario.innerText = puntos !== null ? puntos : "Error";
});


// CERRAR SESIÓN
cerrarSesionBtn.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    window.location.href = "../index.html";
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