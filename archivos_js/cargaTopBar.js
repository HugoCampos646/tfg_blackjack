export const usuario = localStorage.getItem("usuario");

const nombreUsuarioTopBar = document.getElementById("nombreUsuario");
const puntosUsuarioTopBar = document.getElementById("puntosUsuario");

function validarUsuario() {
    if (!usuario) {
        window.location.href = "../index.html";
        return false;
    }
    return true;
}

export async function actualizarPuntosTopBar() {
    if (!puntosUsuarioTopBar) {
        return null;
    }

    try {
        const response = await fetch("http://localhost:3000/api/puntos?usuario=" + usuario);
        const data = await response.json();

        if (data.success) {
            puntosUsuarioTopBar.innerText = data.puntos;
            return data.puntos;
        }

        puntosUsuarioTopBar.innerText = "Error";
        return null;
    } catch (error) {
        puntosUsuarioTopBar.innerText = "Error";
        return null;
    }
}

export async function cargarTopBar() {
    if (!validarUsuario()) {
        return null;
    }

    if (nombreUsuarioTopBar) {
        nombreUsuarioTopBar.innerText = usuario;
    }

    return await actualizarPuntosTopBar();
}
