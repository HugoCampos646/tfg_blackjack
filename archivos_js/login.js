const nombre = document.getElementById("nombre");
const contraseña = document.getElementById("contraseña");
const btnAceptar = document.getElementById("btnAceptar");
const btnMenu = document.getElementById("btnMenu");
const errores = document.getElementById("errores");
const info = document.getElementById("info");

btnMenu.addEventListener("click", () => {
    window.location.href = "../index.html";
});

btnAceptar.addEventListener("click", () => {
    comprobaciones();
});

async function comprobaciones() {

    const nombreVal = nombre.value.trim();
    const passVal = contraseña.value.trim();

    if (!nombreVal || !passVal) {
        errores.innerHTML = "Por favor, completa todos los campos.";
        return;
    }

    try {

        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombreVal,
                password: passVal
            })
        });

        const data = await response.json();

        if (data.success) {

            // guardar usuario en el navegador
            localStorage.setItem("usuario", nombreVal);
            info.innerHTML = "Sesión iniciada correctamente";
            window.location.href = "../archivos_html/principal.html";

        } else {
            errores.innerHTML = data.mensaje;
        }

    } catch (error) {
        errores.innerHTML = "Error al conectar con el servidor.";
    }
}