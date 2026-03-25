const usuario = localStorage.getItem("usuario");
const botonPerfil = document.getElementById("botonPerfil");
const botonEstadisticas = document.getElementById("botonEstadisticas");
const botonTutorial = document.getElementById("botonTutorial");
const botonOnline = document.getElementById("botonOnline");
const botonPartida = document.getElementById("botonPartida");


if (!usuario) {
    window.location.href = "../index.html";
}

// mostrar nombre
document.getElementById("nombreUsuario").innerText = usuario;

// pedir puntos al backend
async function cargarPuntos() {

    try {
        const response = await fetch("http://localhost:3000/puntos?usuario=" + usuario);
        const data = await response.json();

        if (data.success) {
            document.getElementById("puntosUsuario").innerText = data.puntos;
        } else {
            document.getElementById("puntosUsuario").innerText = "Error";
        }
        
    } catch (error) {
        document.getElementById("puntosUsuario").innerText = "Error";
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