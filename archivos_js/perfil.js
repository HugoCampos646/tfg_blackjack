const usuario = localStorage.getItem("usuario");
const nombreUsuarioTopBar = document.getElementById("nombreUsuario");
const nombreUsuario = document.getElementById("nombrePerfil");
const puntosUsuarioTopBar = document.getElementById("puntosUsuario");
const puntosUsuario = document.getElementById("puntosPerfil");
const cambiarNombreBtn = document.getElementById("cambiarNombre");
const cambiarContraseñaBtn = document.getElementById("cambiarContraseña");
const cerrarSesionBtn = document.getElementById("cerrarSesion");

if (!usuario) {
    window.location.href = "../index.html";
}

// FUNCIONES
async function cargarPuntos() {

    try {
        const response = await fetch("http://localhost:3000/api/puntos?usuario=" + usuario);
        const data = await response.json();

        if (data.success) {
            puntosUsuarioTopBar.innerText = data.puntos;
            puntosUsuario.innerText = data.puntos;
        } else {
            puntosUsuarioTopBar.innerText = "Error";
            puntosUsuario.innerText = "Error";
        }

    } catch (error) {
        puntosUsuarioTopBar.innerText = "Error";
        puntosUsuario.innerText = "Error";
    }
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
            nombreUsuarioTopBar.innerText = nuevoNombre;
            nombreUsuario.innerText = nuevoNombre;

        } else {
            alert("No se pudo cambiar el nombre");
        }

    } catch (error) {
        alert("Error al conectar con el servidor");
    }
});

// EVENTO CAMBIAR CONTRASEÑA
cambiarContraseñaBtn.addEventListener("click", () => {
    window.location.href = "cambiarContrasena.html";
});

// cargar puntos
cargarPuntos();

// insertar nombre de usuario en la página
nombreUsuarioTopBar.innerText = usuario;
nombreUsuario.innerText = usuario;

// funcionalidad cerrar sesión
cerrarSesionBtn.addEventListener("click", () => {

    // borrar usuario
    localStorage.removeItem("usuario");

    // redirigir al login
    window.location.href = "../index.html";
});