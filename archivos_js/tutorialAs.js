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

const manoEjemplo =
    document.getElementById("manoEjemplo");

const puntosEjemplo =
    document.getElementById("puntosEjemplo");


const pasos = [

    {
        titulo: "El As",
        texto:
            "El As es la carta más especial del Blackjack."
    },

    {
        titulo: "Puede valer 11",
        texto:
            "Normalmente el As vale 11 puntos.",

        accion: () => {

            mostrarCartas([
                { palo: "H", valor: 1 },
                { palo: "S", valor: 9 }
            ]);

            puntosEjemplo.innerText =
                "Puntos: 20";
        }
    },

    {
        titulo: "También puede valer 1",
        texto:
            "Si tener 11 hace que superes 21, automáticamente cambia a valor 1.",

        accion: () => {

            mostrarCartas([
                { palo: "H", valor: 1 },
                { palo: "S", valor: 9 },
                { palo: "D", valor: 8 }
            ]);

            puntosEjemplo.innerText =
                "Puntos: 18";
        }
    },

    {
        titulo: "Muy importante",
        texto:
            "El As ayuda mucho porque evita que te pases fácilmente de 21."
    },

    {
        titulo: "Fin del tutorial",
        texto:
            "Ya sabes cómo funciona el As en Blackjack."
    }
];

let pasoActual = 0;


// MOSTRAR CARTAS
function mostrarCartas(cartas) {

    manoEjemplo.innerHTML = "";

    cartas.forEach(carta => {

        const img =
            document.createElement("img");

        img.src =
            `../assets/cartas/${carta.palo}-${carta.valor}.png`;

        manoEjemplo.appendChild(img);
    });
}


// MOSTRAR PASO
function mostrarPaso() {

    const paso =
        pasos[pasoActual];

    tituloPaso.innerText =
        paso.titulo;

    textoTutorial.innerText =
        paso.texto;

    manoEjemplo.innerHTML = "";
    puntosEjemplo.innerText = "";

    if (paso.accion) {

        paso.accion();
    }

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