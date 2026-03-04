const nombre = document.getElementById("nombre");
const contraseña = document.getElementById("contraseña");
const contraseñaRepetida = document.getElementById("contraseñaRepetida");
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
    const passRepVal = contraseñaRepetida.value.trim();

    if (!nombreVal || !passVal || !passRepVal) {
        errores.innerHTML = "Por favor, completa todos los campos.";
        return;
    }

    if (passVal !== passRepVal) {
        errores.innerHTML = "Las contraseñas no coinciden.";
        return;
    }

    try {

        const response = await fetch("http://localhost:3000/registro", {
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
            info.innerHTML = "Usuario registrado correctamente";
        } else {
            errores.innerHTML = data.mensaje;
        }

    } catch (error) {
        errores.innerHTML = "Error al conectar con el servidor.";
    }
}
