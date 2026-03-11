const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/login", (req, res) => {

    const { nombre, password } = req.body;

    const sql = `
        SELECT * 
        FROM usuarios
        WHERE nombre_usuario = ?
    `;

    db.query(sql, [nombre], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                mensaje: "Error en el servidor"
            });
        }

        if (result.length === 0) {
            return res.json({
                success: false,
                mensaje: "Usuario no encontrado"
            });
        }

        const usuario = result[0];

        // comprobar contraseña
        if (usuario.password_hash !== password) {
            return res.json({
                success: false,
                mensaje: "Contraseña incorrecta"
            });
        }

        return res.json({
            success: true,
            mensaje: "Login correcto"
        });

    });

});

module.exports = router;