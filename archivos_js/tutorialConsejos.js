import { usuario, cargarTopBar } from "./cargaTopBar.js";

if (!usuario) {

    window.location.href =
        "../index.html";
}

cargarTopBar();

const tituloPaso =
    document.getElementById("tituloPaso");

const textoTutorial =
    document.getElementById("textoTutorial");

const siguienteBtn =
    document.getElementById("siguiente");

const volverMenuBtn =
    document.getElementById("volverMenu");


const pasos = [

    {
        titulo: "No arriesgues con 20",
        texto:
            "Si tienes 20 puntos normalmente lo mejor es plantarse."
    },

    {
        titulo: "Con pocos puntos",
        texto:
            "Con menos de 12 puntos puedes pedir carta con poco riesgo."
    },

    {
        titulo: "Cuidado con 16",
        texto:
            "16 es una de las manos más peligrosas del Blackjack."
    },

    {
        titulo: "Observa al crupier",
        texto:
            "Si el crupier enseña una carta baja, tiene más posibilidades de pasarse."
    },

    {
        titulo: "Controla tus apuestas",
        texto:
            "No apuestes demasiados puntos en una sola partida."
    },

    {
        titulo: "Fin del tutorial",
        texto:
            "Ya conoces algunos consejos básicos para jugar mejor."
    }
];

let pasoActual = 0;


// MOSTRAR PASO
function mostrarPaso() {

    const paso =
        pasos[pasoActual];

    tituloPaso.innerText =
        paso.titulo;

    textoTutorial.innerText =
        paso.texto;

    if (pasoActual === pasos.length - 1) {

        siguienteBtn.classList.add(
            "oculto"
        );

        volverMenuBtn.classList.remove(
            "oculto"
        );
    }
}


// SIGUIENTE
siguienteBtn.addEventListener(
    "click",
    () => {

        pasoActual++;

        mostrarPaso();
    }
);


// VOLVER
volverMenuBtn.addEventListener(
    "click",
    () => {

        window.location.href =
            "../archivos_html/principal.html";
    }
);


mostrarPaso();