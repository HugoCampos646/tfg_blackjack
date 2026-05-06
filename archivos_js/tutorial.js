
const manoJugadorDiv = document.getElementById("manoJugador");
const manoCrupierDiv = document.getElementById("manoCrupier");

const puntosJugadorText = document.getElementById("puntosJugador");
const puntosCrupierText = document.getElementById("puntosCrupier");

const textoTutorial = document.getElementById("textoTutorial");
const tituloPaso = document.getElementById("tituloPaso");

const siguienteBtn = document.getElementById("siguiente");
const volverMenuBtn = document.getElementById("volverMenu");

// CARTAS PREPARADAS
const manoJugador = [
    { palo: "H", valor: 10 },
    { palo: "S", valor: 7 },
    { palo: "D", valor: 4 }
];

const manoCrupier = [
    { palo: "C", valor: 9 },
    { palo: "D", valor: 8 }
];

// PASOS
const pasos = [

    {
        titulo: "Objetivo del Blackjack",
        texto:
            "El objetivo es conseguir una mano con un valor lo más cercano posible a 21 sin pasarse. Si superas 21 puntos, pierdes automáticamente."
    },

    {
        titulo: "Valor de las cartas",
        texto:
            "Las cartas del 2 al 10 valen su número. Las figuras (J, Q y K) valen 10. El As vale 11, excepto si eso hace que te pases de 21, en cuyo caso vale 1."
    },

    {
        titulo: "Inicio de la partida",
        texto:
            "Cada jugador recibe dos cartas. El crupier también recibe dos, pero una permanece oculta hasta el final."
    },

    {
        titulo: "Tu mano",
        accion: () => {

            mostrarJugador(2);

            puntosJugadorText.innerText = "Puntos: 17";
        },
        texto:
            "Aquí puedes ver tus dos cartas iniciales. Tu mano suma 17 puntos."
    },

    {
        titulo: "Mano del crupier",
        accion: () => {

            mostrarCrupier(false);
        },
        texto:
            "El crupier muestra solo una carta. La otra permanece boca abajo hasta que termine tu turno."
    },

    {
        titulo: "Pedir carta",
        accion: () => {

            mostrarJugador(3);

            puntosJugadorText.innerText = "Puntos: 21";
        },
        texto:
            "Si crees que necesitas más puntos, puedes pedir carta. En este ejemplo pides una carta y consigues 21."
    },

    {
        titulo: "Plantarse",
        texto:
            "Cuando estás satisfecho con tu puntuación puedes plantarte. Entonces el crupier juega automáticamente."
    },

    {
        titulo: "Turno del crupier",
        accion: () => {

            mostrarCrupier(true);

            puntosCrupierText.innerText = "Puntos: 17";
        },
        texto:
            "El crupier revela su carta oculta. Debe pedir cartas hasta llegar al menos a 17 puntos."
    },

    {
        titulo: "Cómo ganar",
        texto:
            "Ganas si tienes más puntos que el crupier sin superar 21, o si el crupier se pasa de 21."
    },

    {
        titulo: "Cómo perder",
        texto:
            "Pierdes si te pasas de 21 o si el crupier tiene más puntos que tú sin pasarse."
    },

    {
        titulo: "Empate",
        texto:
            "Si tú y el crupier tenéis exactamente los mismos puntos, la partida termina en empate."
    },

    {
        titulo: "Fin del tutorial",
        texto:
            "Ya conoces las reglas básicas del Blackjack. Ahora puedes jugar partidas reales desde el menú principal."
    }
];

let pasoActual = 0;

// MOSTRAR CARTAS JUGADOR
function mostrarJugador(cantidad) {

    manoJugadorDiv.innerHTML = "";

    for (let i = 0; i < cantidad; i++) {

        const carta = manoJugador[i];

        const img = document.createElement("img");

        img.src =
            `../assets/cartas/${carta.palo}-${carta.valor}.png`;

        manoJugadorDiv.appendChild(img);
    }
}

// MOSTRAR CARTAS CRUPIER
function mostrarCrupier(revelar) {

    manoCrupierDiv.innerHTML = "";

    manoCrupier.forEach((carta, index) => {

        const img = document.createElement("img");

        if (index === 1 && !revelar) {

            img.src = "../assets/cartas/Back-R.png";

        } else {

            img.src =
                `../assets/cartas/${carta.palo}-${carta.valor}.png`;
        }

        manoCrupierDiv.appendChild(img);
    });
}

// MOSTRAR PASO
function mostrarPaso() {

    const paso = pasos[pasoActual];

    tituloPaso.innerText = paso.titulo;

    textoTutorial.innerText = paso.texto;

    if (paso.accion) {
        paso.accion();
    }

    // FINAL
    if (pasoActual === pasos.length - 1) {

        siguienteBtn.classList.add("oculto");

        volverMenuBtn.classList.remove("oculto");
    }
}

// SIGUIENTE
siguienteBtn.addEventListener("click", () => {

    pasoActual++;

    mostrarPaso();
});

// VOLVER
volverMenuBtn.addEventListener("click", () => {

    window.location.href = "../archivos_html/principal.html";
});

// INICIO
mostrarPaso();