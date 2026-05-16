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

cargarTopBar();

// GENERAR CÓDIGO
function generarCodigo() {

    return Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();
}


// CREAR MESA
crearMesaBtn.addEventListener("click", () => {

    const apuesta =
        parseInt(apuestaInput.value);

    if (isNaN(apuesta) || apuesta <= 0) {

        errores.innerText =
            "Introduce una apuesta válida";

        return;
    }

    const codigoMesa =
        generarCodigo();

    localStorage.setItem(
        "codigoMesa",
        codigoMesa
    );

    localStorage.setItem(
        "apuesta",
        apuesta
    );

    window.location.href =
        "../archivos_html/onlineSala.html";
});


// UNIRSE
unirseMesaBtn.addEventListener("click", () => {

    const apuesta =
        parseInt(apuestaInput.value);

    const codigoMesa =
        codigoMesaInput.value.trim();

    if (isNaN(apuesta) || apuesta <= 0) {

        errores.innerText =
            "Introduce una apuesta válida";

        return;
    }

    if (!codigoMesa) {

        errores.innerText =
            "Introduce un código";

        return;
    }

    localStorage.setItem(
        "codigoMesa",
        codigoMesa.toUpperCase()
    );

    localStorage.setItem(
        "apuesta",
        apuesta
    );

    window.location.href =
        "../archivos_html/onlineSala.html";
});