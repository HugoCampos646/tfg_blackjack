const usuario = localStorage.getItem("usuario");

const apuesta = parseInt(localStorage.getItem("apuesta")) || 0;
let puntosUsuario = parseInt(localStorage.getItem("puntos")) || 0;

const nombreUsuario = document.getElementById("nombreUsuario");
const puntosTotales = document.getElementById("puntosTotales");
const apuestaTexto = document.getElementById("apuestaTexto");

const manoJugadorDiv = document.getElementById("manoJugador");
const manoCrupierDiv = document.getElementById("manoCrupier");

const puntosJugadorText = document.getElementById("puntosJugador");
const puntosCrupierText = document.getElementById("puntosCrupier");
const resultadoText = document.getElementById("resultado");

const pedirBtn = document.getElementById("pedir");
const plantarseBtn = document.getElementById("plantarse");
const reiniciarBtn = document.getElementById("reiniciar");
const volverMenuBtn = document.getElementById("volverMenu");

let baraja = [];
let manoJugador = [];
let manoCrupier = [];

let juegoTerminado = false;
let cartaOculta = null;

if (!usuario) {
    window.location.href = "../index.html";
}

// TOP BAR
nombreUsuario.innerText = usuario;
puntosTotales.innerText = puntosUsuario;
apuestaTexto.innerText = apuesta;

// CREAR BARAJA
function crearBaraja() {

    const palos = ["C", "D", "H", "S"];

    const nuevaBaraja = [];

    for (let palo of palos) {

        for (let i = 1; i <= 13; i++) {

            nuevaBaraja.push({
                palo,
                valor: i
            });

        }
    }

    return nuevaBaraja.sort(() => Math.random() - 0.5);
}

// VALOR CARTA
function valorCarta(carta) {

    if (carta.valor >= 11) {
        return 10;
    }

    if (carta.valor === 1) {
        return 11;
    }

    return carta.valor;
}

// CALCULAR PUNTOS
function calcularPuntos(mano) {

    let total = 0;
    let ases = 0;

    for (let carta of mano) {

        total += valorCarta(carta);

        if (carta.valor === 1) {
            ases++;
        }
    }

    while (total > 21 && ases > 0) {

        total -= 10;
        ases--;
    }

    return total;
}

// SACAR CARTA
function sacarCarta() {
    return baraja.pop();
}

// MOSTRAR CARTAS
function mostrarCartas() {

    manoJugadorDiv.innerHTML = "";
    manoCrupierDiv.innerHTML = "";

    // jugador
    manoJugador.forEach(carta => {

        const img = document.createElement("img");

        img.src = `../assets/cartas/${carta.palo}-${carta.valor}.png`;

        img.width = 90;

        manoJugadorDiv.appendChild(img);
    });

    // crupier
    manoCrupier.forEach((carta, index) => {

        const img = document.createElement("img");

        if (index === 1 && !juegoTerminado) {

            img.src = "../assets/cartas/Back-R.png";

        } else {

            img.src = `../assets/cartas/${carta.palo}-${carta.valor}.png`;
        }

        img.width = 90;

        manoCrupierDiv.appendChild(img);
    });

    puntosJugadorText.innerText =
        "Puntos: " + calcularPuntos(manoJugador);

    if (juegoTerminado) {

        puntosCrupierText.innerText =
            "Puntos: " + calcularPuntos(manoCrupier);

    } else {

        puntosCrupierText.innerText = "Puntos: ?";
    }
}

// MOSTRAR BOTONES FINAL
function mostrarBotonesFinal() {

    reiniciarBtn.classList.remove("oculto");
    volverMenuBtn.classList.remove("oculto");

    pedirBtn.disabled = true;
    plantarseBtn.disabled = true;
}

// GUARDAR PUNTOS EN BD
async function guardarPuntos() {

    try {

        await fetch("http://localhost:3000/api/actualizarPuntos", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                usuario: usuario,
                puntos: puntosUsuario
            })

        });

    } catch (error) {

        console.log("Error al guardar puntos");
    }
}

// TERMINAR PARTIDA
async function terminarPartida(resultado) {

    juegoTerminado = true;

    resultadoText.innerText = resultado;

    localStorage.setItem("puntos", puntosUsuario);

    puntosTotales.innerText = puntosUsuario;

    await guardarPuntos();

    mostrarCartas();

    mostrarBotonesFinal();
}

// INICIAR PARTIDA
function iniciarJuego() {

    // comprobar si aún tiene puntos
    puntosUsuario = parseInt(localStorage.getItem("puntos")) || 0;

    if (puntosUsuario < apuesta) {

        alert("Ya no tienes suficientes puntos para jugar esa apuesta");

        window.location.href = "../archivos_html/puntosJugar.html";

        return;
    }

    baraja = crearBaraja();

    manoJugador = [];
    manoCrupier = [];

    juegoTerminado = false;

    resultadoText.innerText = "";

    reiniciarBtn.classList.add("oculto");
    volverMenuBtn.classList.add("oculto");

    pedirBtn.disabled = false;
    plantarseBtn.disabled = false;

    // reparto inicial
    manoJugador.push(sacarCarta());

    manoCrupier.push(sacarCarta());

    cartaOculta = sacarCarta();

    manoCrupier.push(cartaOculta);

    manoJugador.push(sacarCarta());

    mostrarCartas();
}

iniciarJuego();

// PEDIR CARTA
pedirBtn.addEventListener("click", async () => {

    if (juegoTerminado) return;

    manoJugador.push(sacarCarta());

    if (calcularPuntos(manoJugador) > 21) {

        puntosUsuario -= apuesta;

        await terminarPartida("Te pasaste. Pierdes.");
    }

    mostrarCartas();
});

// PLANTARSE
plantarseBtn.addEventListener("click", async () => {

    if (juegoTerminado) return;

    juegoTerminado = true;

    while (calcularPuntos(manoCrupier) < 17) {

        manoCrupier.push(sacarCarta());
    }

    const puntosJugador = calcularPuntos(manoJugador);
    const puntosCrupier = calcularPuntos(manoCrupier);

    if (puntosCrupier > 21) {

        puntosUsuario += apuesta;

        await terminarPartida("Crupier se pasa. Ganas.");
    }

    else if (puntosJugador > puntosCrupier) {

        puntosUsuario += apuesta;

        await terminarPartida("Ganas.");
    }

    else if (puntosJugador < puntosCrupier) {

        puntosUsuario -= apuesta;

        await terminarPartida("Pierdes.");
    }

    else {

        await terminarPartida("Empate.");
    }
});

// NUEVA PARTIDA
reiniciarBtn.addEventListener("click", iniciarJuego);

// VOLVER AL MENÚ
volverMenuBtn.addEventListener("click", () => {

    window.location.href = "../archivos_html/principal.html";
});