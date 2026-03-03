const nombre = document.getElementById("nombre");
const contraseña = document.getElementById("contraseña");
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

    // comprobar ningún campo vacío
    if (!nombreVal || !passVal) {
        errores.innerHTML = "Por favor, completa todos los campos.";
        return;
    }

    // Comprobar si la contraseña es correcta para el nombre de usuario dado

    // si llega aquí, todo está bien
    // puedes continuar con el envío del formulario o el registro
}