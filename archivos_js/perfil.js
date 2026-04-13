const usuario = localStorage.getItem("usuario");

const nombreUsuarioTopBar = document.getElementById("nombreUsuario");
const nombreUsuario = document.getElementById("nombrePerfil");
const puntosUsuarioTopBar = document.getElementById("puntosUsuario");
const puntosUsuario = document.getElementById("puntosPerfil");

// pedir puntos al backend e insertarlos en la página
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

cargarPuntos();

// insertar nombre de usuario en la página
nombreUsuarioTopBar.innerText = usuario;
nombreUsuario.innerText = usuario;