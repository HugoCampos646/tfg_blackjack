import { cargarTopBar } from "./cargaTopBar.js";
import { API_URL } from "./config.js";

const volverBtn = document.getElementById("volver");
const eliminarUsuarioBtn = document.getElementById("eliminarUsuario");
const contrsenaEliminar = document.getElementById("contrasena");
const errores = document.getElementById("errores");

cargarTopBar();

volverBtn.addEventListener("click", () => {
    window.location.href = "../archivos_html/perfil.html";
});

// ELIMINAR USUARIO
eliminarUsuarioBtn.addEventListener("click", async () => {

    errores.innerText = ""; // limpiar errores

    const contrsena = contrsenaEliminar.value;

    // VALIDACIÓN
    if (!contrsena) {
        errores.innerText = "Introduce tu contraseña";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/eliminarUsuario`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario: localStorage.getItem("usuario"),
                contraseña: contrsena
            })
        });

        const data = await response.json();

        if (data.success) {

            // borrar sesión
            localStorage.removeItem("usuario");

            // redirigir
            window.location.href = "../index.html";

        } else {
            errores.innerText = data.mensaje || "No se pudo eliminar la cuenta";
        }

    } catch (error) {
        errores.innerText = "Error al conectar con el servidor";
    }
});