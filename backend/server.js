const express = require("express");
const cors = require("cors");
const path = require("path");

const http = require("http");
const { Server } = require("socket.io");

const registroRoutes = require("./routes/registro");
const loginRoutes = require("./routes/login");
const consultaPuntosRoutes = require("./routes/consultaPuntos");
const cambiarNombreRoutes = require("./routes/cambiarNombre");
const cambiarContrasenaRoutes = require("./routes/cambiarContrasena");
const eliminarUsuarioRoutes = require("./routes/eliminarUsuario");
const ingresarPuntosRoutes = require("./routes/ingresarPuntos");
const estadisticasRoutes = require("./routes/estadisticas");
const actualizarPuntosRoutes = require("./routes/actualizarPuntos");
const actualizarEstadisticasRoutes = require("./routes/actualizarEstadisticas");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors());
app.use(express.json());

// rutas
app.use("/api/registro", registroRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/puntos", consultaPuntosRoutes);
app.use("/api/cambiarNombre", cambiarNombreRoutes);
app.use("/api/cambiarContrasena", cambiarContrasenaRoutes);
app.use("/api/eliminarUsuario", eliminarUsuarioRoutes);
app.use("/api/ingresarPuntos", ingresarPuntosRoutes);
app.use("/api/estadisticas", estadisticasRoutes);
app.use("/api/actualizarPuntos", actualizarPuntosRoutes);
app.use("/api/actualizarEstadisticas", actualizarEstadisticasRoutes);

// archivos estáticos
app.use(express.static(path.join(__dirname, "../")));


// SOCKETS
io.on("connection", (socket) => {

    console.log("Usuario conectado");

    // unirse a una mesa
    socket.on("unirseMesa", (codigoMesa) => {

        socket.join(codigoMesa);

        console.log("Jugador unido a mesa:", codigoMesa);

        // avisar a todos en la mesa
        io.to(codigoMesa).emit("jugadorUnido");
    });

    socket.on("disconnect", () => {

        console.log("Usuario desconectado");
    });
});


// puerto render
const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {

    console.log("Servidor corriendo en puerto " + PORT);
});