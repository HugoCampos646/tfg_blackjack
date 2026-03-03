const nombre = document.getElementById("nombre");
const contraseña = document.getElementById("contraseña");
const contraseñaRepetida = document.getElementById("contraseñaRepetida");
const btnAceptar = document.getElementById("btnAceptar");
const btnMenu = document.getElementById("btnMenu");
const errores = document.getElementById("errores");

btnMenu.addEventListener("click", () => {
    window.location.href = "../index.html";
});

btnAceptar.addEventListener("click", () => {
    comprobaciones();
});

function comprobaciones() {
    // obtenemos valores y quitamos espacios
    const nombreVal = nombre.value.trim();
    const passVal = contraseña.value.trim();
    const passRepVal = contraseñaRepetida.value.trim();

    // comprobar ningún campo vacío
    if (!nombreVal || !passVal || !passRepVal) {
        errores.innerHTML = "Por favor, completa todos los campos.";
        return;
    }

    // comprobar que las contraseñas coinciden
    if (passVal !== passRepVal) {
        errores.innerHTML = "Las contraseñas no coinciden. Por favor, escríbelas de nuevo.";
        return;
    }

    // Comprobar si el nombre de usuario ya existe

    // si llega aquí, todo está bien
    // puedes continuar con el envío del formulario o el registro
}
