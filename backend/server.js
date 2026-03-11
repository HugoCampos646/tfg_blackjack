const express = require("express");
const cors = require("cors");
const path = require("path");

const registroRoutes = require("./routes/registro");
const loginRoutes = require("./routes/login");

const app = express();

app.use(cors());
app.use(express.json());

// rutas
app.use("/", registroRoutes);
app.use("/", loginRoutes);

// archivos estáticos
app.use(express.static(path.join(__dirname, "../")));

app.listen(3000, "0.0.0.0", () => {
    console.log("Servidor corriendo en puerto 3000");
});