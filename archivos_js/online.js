import { API_URL } from "./config.js";
import { usuario, cargarTopBar } from "./cargaTopBar.js";

const crearMesaBtn =
    document.getElementById("crearMesa");

const unirseMesaBtn =
    document.getElementById("unirseMesa");

const apuestaInput =
    document.getElementById("apuesta");

const codigoMesaInput =
    document.getElementById("codigoMesa");

const errores =
    document.getElementById("errores");


if (!usuario) {
    window.location.href = "../index.html";
}

let puntosUsuario = 0;

// cargar topbar y obtener puntos
cargarTopBar().then((puntos) => {

    puntosUsuario = puntos;
});

// GENERAR CÓDIGO
function generarCodigo() {

    return Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();
}


// CREAR MESA
crearMesaBtn.addEventListener("click", () => {

    errores.innerText = "";

    const apuesta =
        parseInt(apuestaInput.value);

    // comprobar apuesta válida
    if (isNaN(apuesta) || apuesta <= 0) {

        errores.innerText =
            "Introduce una apuesta válida";

        return;
    }

    // comprobar suficientes puntos
    if (apuesta > puntosUsuario) {

        errores.innerText =
            "No tienes suficientes puntos";

        return;
    }

    const codigoMesa =
        generarCodigo();

    localStorage.removeItem("partidaOnline");
    localStorage.setItem(
        "codigoMesa",
        codigoMesa
    );

    localStorage.setItem(
        "apuesta",
        apuesta
    );

    localStorage.setItem(
        "puntos",
        puntosUsuario
    );

    window.location.href =
        "../archivos_html/onlineSala.html";
});


// UNIRSE
unirseMesaBtn.addEventListener("click", () => {

    errores.innerText = "";

    const apuesta =
        parseInt(apuestaInput.value);

    const codigoMesa =
        codigoMesaInput.value.trim();

    // comprobar apuesta válida
    if (isNaN(apuesta) || apuesta <= 0) {

        errores.innerText =
            "Introduce una apuesta válida";

        return;
    }

    // comprobar suficientes puntos
    if (apuesta > puntosUsuario) {

        errores.innerText =
            "No tienes suficientes puntos";

        return;
    }

    // comprobar código
    if (!codigoMesa) {

        errores.innerText =
            "Introduce un código";

        return;
    }

    localStorage.removeItem("partidaOnline");
    localStorage.setItem(
        "codigoMesa",
        codigoMesa.toUpperCase()
    );

    localStorage.setItem(
        "apuesta",
        apuesta
    );

    localStorage.setItem(
        "puntos",
        puntosUsuario
    );

    window.location.href =
        "../archivos_html/onlineSala.html";
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