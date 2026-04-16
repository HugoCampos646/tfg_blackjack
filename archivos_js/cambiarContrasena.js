import { usuario, cargarTopBar } from "./cargaTopBar.js";

const volverBtn = document.getElementById("volver");
const cambiarContraseñaBtn = document.getElementById("cambiarContraseña");

const errores = document.getElementById("errores");
const info = document.getElementById("info");

const contraseñaActual = document.getElementById("contraseñaActual");
const contraseñaNueva = document.getElementById("contraseñaNueva");
const contraseñaNuevaRepetida = document.getElementById("contraseñaNuevaRepetida");

if (!usuario) {
    window.location.href = "../index.html";
}

// cargar datos del top bar
cargarTopBar();

// boton cambiar contraseña
cambiarContraseñaBtn.addEventListener("click", async () => {

    const actual = contraseñaActual.value;
    const nueva = contraseñaNueva.value;
    const repetida = contraseñaNuevaRepetida.value;

    // validaciones
    if (!actual || !nueva || !repetida) {
        errores.innerText = "Rellena todos los campos";
        return;
    }

    if (nueva !== repetida) {
        errores.innerText = "Las contraseñas nuevas no coinciden";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/cambiarContrasena", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario: usuario,
                contraseñaActual: actual,
                contraseñaNueva: nueva
            })
        });

        const data = await response.json();

        if (data.success) {
            info.innerText = "Contraseña cambiada correctamente";

            // limpiar errores
            errores.innerText = "";

            // limpiar campos
            contraseñaActual.value = "";
            contraseñaNueva.value = "";
            contraseñaNuevaRepetida.value = "";

        } else {
            errores.innerText = data.mensaje || "Error al cambiar contraseña";
        }

    } catch (error) {
        errores.innerText = "Error de conexión con el servidor";
    }
});


// volver a perfil
volverBtn.addEventListener("click", () => {
    window.location.href = "../archivos_html/perfil.html";
});