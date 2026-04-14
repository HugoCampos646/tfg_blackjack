import { usuario, cargarTopBar } from "./cargaTopBar.js";

const nombreUsuario = document.getElementById("nombrePerfil");
const puntosUsuario = document.getElementById("puntosPerfil");
const cambiarNombreBtn = document.getElementById("cambiarNombre");
const cambiarContraseñaBtn = document.getElementById("cambiarContraseña");
const cerrarSesionBtn = document.getElementById("cerrarSesion");
const eliminarUsuarioBtn = document.getElementById("eliminarUsuario");

if (!usuario) {
    window.location.href = "../index.html";
}

// EVENTO CAMBIAR NOMBRE
cambiarNombreBtn.addEventListener("click", async () => {

    const nuevoNombre = prompt("Introduce tu nuevo nombre:");

    // validar
    if (!nuevoNombre || nuevoNombre.trim() === "") {
        alert("Nombre no válido");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/cambiarNombre", {
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

            // actualizar localStorage
            localStorage.setItem("usuario", nuevoNombre);
            location.reload();

            // actualizar en pantalla
            nombreUsuario.innerText = nuevoNombre;

        } else {
            alert("No se pudo cambiar el nombre");
        }

    } catch (error) {
        alert("Error al conectar con el servidor");
    }
});

// evento cambiar contraseña
cambiarContraseñaBtn.addEventListener("click", () => { 
    window.location.href = "cambiarContrasena.html";
});

// evento eliminar usuario
eliminarUsuarioBtn.addEventListener("click", () => { 
    window.location.href = "eliminarUsuario.html";
});

// cargar datos del top bar y puntos del perfil
cargarTopBar().then((puntos) => {
    nombreUsuario.innerText = usuario;
    puntosUsuario.innerText = puntos !== null ? puntos : "Error";
});

// funcionalidad cerrar sesión
cerrarSesionBtn.addEventListener("click", () => {

    // borrar usuario
    localStorage.removeItem("usuario");

    // redirigir al login
    window.location.href = "../index.html";
});