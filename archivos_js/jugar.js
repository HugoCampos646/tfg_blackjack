const manoJugadorDiv = document.getElementById("manoJugador");
const manoCrupierDiv = document.getElementById("manoCrupier");

const puntosJugadorText = document.getElementById("puntosJugador");
const puntosCrupierText = document.getElementById("puntosCrupier");
const resultadoText = document.getElementById("resultado");

const pedirBtn = document.getElementById("pedir");
const plantarseBtn = document.getElementById("plantarse");
const reiniciarBtn = document.getElementById("reiniciar");

let baraja = [];
let manoJugador = [];
let manoCrupier = [];
let juegoTerminado = false;
let cartaOculta = null;

// CREAR BARAJA
function crearBaraja() {
    const palos = ["C", "D", "H", "S"];
    const nuevaBaraja = [];

    for (let palo of palos) {
        for (let i = 1; i <= 13; i++) {
            nuevaBaraja.push({ palo, valor: i });
        }
    }

    return nuevaBaraja.sort(() => Math.random() - 0.5);
}

// VALOR CARTA
function valorCarta(carta) {
    if (carta.valor >= 11) return 10;
    if (carta.valor === 1) return 11;
    return carta.valor;
}

// CALCULAR PUNTOS (con As dinámico)
function calcularPuntos(mano) {
    let total = 0;
    let ases = 0;

    for (let carta of mano) {
        total += valorCarta(carta);
        if (carta.valor === 1) ases++;
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
        img.width = 80;
        manoJugadorDiv.appendChild(img);
    });

    // crupier
    manoCrupier.forEach((carta, index) => {
        const img = document.createElement("img");

        if (index === 1 && !juegoTerminado) {
            img.src = `../assets/cartas/Back-R.png`;
        } else {
            img.src = `../assets/cartas/${carta.palo}-${carta.valor}.png`;
        }

        img.width = 80;
        manoCrupierDiv.appendChild(img);
    });

    puntosJugadorText.innerText = "Puntos: " + calcularPuntos(manoJugador);

    if (juegoTerminado) {
        puntosCrupierText.innerText = "Puntos: " + calcularPuntos(manoCrupier);
    } else {
        puntosCrupierText.innerText = "Puntos: ?";
    }
}

// INICIAR PARTIDA
function iniciarJuego() {
    baraja = crearBaraja();
    manoJugador = [];
    manoCrupier = [];
    juegoTerminado = false;
    resultadoText.innerText = "";

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
pedirBtn.addEventListener("click", () => {

    if (juegoTerminado) return;

    manoJugador.push(sacarCarta());

    if (calcularPuntos(manoJugador) > 21) {
        juegoTerminado = true;
        resultadoText.innerText = "Te pasaste. Pierdes.";
    }

    mostrarCartas();
});

// PLANTARSE
plantarseBtn.addEventListener("click", () => {

    if (juegoTerminado) return;

    juegoTerminado = true;

    // turno crupier
    while (calcularPuntos(manoCrupier) < 17) {
        manoCrupier.push(sacarCarta());
    }

    const puntosJugador = calcularPuntos(manoJugador);
    const puntosCrupier = calcularPuntos(manoCrupier);

    if (puntosCrupier > 21) {
        resultadoText.innerText = "Crupier se pasa. Ganas.";
    } else if (puntosJugador > puntosCrupier) {
        resultadoText.innerText = "Ganas.";
    } else if (puntosJugador < puntosCrupier) {
        resultadoText.innerText = "Pierdes.";
    } else {
        resultadoText.innerText = "Empate.";
    }

    mostrarCartas();
});

// REINICIAR
reiniciarBtn.addEventListener("click", iniciarJuego);