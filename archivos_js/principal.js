const usuario = localStorage.getItem("usuario");

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