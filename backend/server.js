const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // vacio porque se usa XAMPP
    database: "blackjack"
});

connection.connect((err) => {
    if (err) {
        console.error("Error conectando a la BD:", err);
    } else {
        console.log("Conectado a MySQL correctamente");
    }
});

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
