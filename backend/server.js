const express = require("express"); 
const cors = require("cors"); 
const path = require("path");

const registroRoutes = require("./routes/registro");
const loginRoutes = require("./routes/login");
const consultaPuntosRoutes = require("./routes/consultaPuntos");
const cambiarNombreRoutes = require("./routes/cambiarNombre");
const cambiarContrasenaRoutes = require("./routes/cambiarContrasena");
const eliminarUsuarioRoutes = require("./routes/eliminarUsuario");

const app = express(); // crear servidor

app.use(cors()); // permite que el frontend pueda hacer peticiones
app.use(express.json()); // permite leer formato json en peticiones

// rutas
app.use("/api/registro", registroRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/puntos", consultaPuntosRoutes);
app.use("/api/cambiarNombre", cambiarNombreRoutes);
app.use("/api/cambiarContrasena", cambiarContrasenaRoutes);
app.use("/api/eliminarUsuario", eliminarUsuarioRoutes);

// archivos estáticos
app.use(express.static(path.join(__dirname, "../")));

app.listen(3000, "0.0.0.0", () => {
    console.log("Servidor corriendo en puerto 3000");
});