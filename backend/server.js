const path = require("path");

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Permitir peticiones del frontend
app.use(cors());
app.use(express.json());

// Conexión a MySQL (XAMPP)
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // en XAMPP suele estar vacío
    database: "blackjack"
});

db.connect(err => {
    if (err) {
        console.error("Error conectando a la BD:", err);
    } else {
        console.log("Conectado a MySQL");
    }
});

// Ruta de registro
app.post("/registro", (req, res) => {

    const { nombre, password } = req.body;

    // Comprobar si existe
    const sqlCheck = "SELECT * FROM usuarios WHERE nombre_usuario = ?";
    db.query(sqlCheck, [nombre], (err, result) => {

        if (err) {
            return res.status(500).json({ success: false, mensaje: "Error en el servidor" });
        }

        if (result.length > 0) {
            return res.json({ success: false, mensaje: "El usuario ya existe" });
        }

        // Insertar usuario (puntos = 1000 por defecto)
        const sqlInsert = `
            INSERT INTO usuarios (nombre_usuario, password_hash)
            VALUES (?, ?)
        `;

        db.query(sqlInsert, [nombre, password], (err, result) => {

            if (err) {
                return res.status(500).json({ success: false, mensaje: "Error al registrar" });
            }

            return res.json({ success: true, mensaje: "Usuario registrado correctamente" });
        });
    });
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Servidor corriendo en puerto 3000");
});
app.use(express.static(path.join(__dirname, "../")));