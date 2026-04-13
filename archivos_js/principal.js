const usuario = localStorage.getItem("usuario");

const botonPerfil = document.getElementById("botonPerfil");
const botonEstadisticas = document.getElementById("botonEstadisticas");
const botonTutorial = document.getElementById("botonTutorial");
const botonOnline = document.getElementById("botonOnline");
const botonPartida = document.getElementById("botonPartida");
const nombreUsuarioTopBar = document.getElementById("nombreUsuario");
const puntosUsuarioTopBar = document.getElementById("puntosUsuario");


if (!usuario) {
    window.location.href = "../index.html";
}

// mostrar nombre
nombreUsuarioTopBar.innerText = usuario;

// pedir puntos al backend
async function cargarPuntos() {

    try {
        const response = await fetch("http://localhost:3000/api/puntos?usuario=" + usuario);
        const data = await response.json();

        if (data.success) {
            puntosUsuarioTopBar.innerText = data.puntos;
        } else {
            puntosUsuarioTopBar.innerText = "Error";
        }
        
    } catch (error) {
        puntosUsuarioTopBar.innerText = "Error";
    }
}

cargarPuntos();

// Event listener para las rutas de los botones

botonPerfil.addEventListener("click", function() {
    window.location.href = "../archivos_html/perfil.html";
});

botonTutorial.addEventListener("click", function() {
    window.location.href = "../archivos_html/tutorial.html";
});

botonJugar.addEventListener("click", function() {
    window.location.href = "../archivos_html/jugar.html";
});

botonOnline.addEventListener("click", function() {
    window.location.href = "../archivos_html/online.html";
});

botonEstadisticas.addEventListener("click", function() {
    window.location.href = "../archivos_html/estadisticas.html";
});