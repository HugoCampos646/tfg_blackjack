const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/registro", (req, res) => {

    const { nombre, password } = req.body;

    const sqlCheck = "SELECT * FROM usuarios WHERE nombre_usuario = ?";

    db.query(sqlCheck, [nombre], (err, result) => {

        if (err) {
            return res.status(500).json({ success: false, mensaje: "Error en el servidor" });
        }

        if (result.length > 0) {
            return res.json({ success: false, mensaje: "El usuario ya existe" });
        }

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

module.exports = router;