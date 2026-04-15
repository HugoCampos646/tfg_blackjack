const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {

    const { nombre, password } = req.body;

    const sqlCheck = "SELECT * FROM usuarios WHERE nombre_usuario = ?";

    db.query(sqlCheck, [nombre], (err, result) => {

        if (err) {
            return res.status(500).json({ success: false, mensaje: "Error en el servidor" });
        }

        if (result.length > 0) {
            return res.json({ success: false, mensaje: "El usuario ya existe" });
        }

        const sqlInsertUsuario = `
            INSERT INTO usuarios (nombre_usuario, password_hash)
            VALUES (?, ?)
        `;

        db.query(sqlInsertUsuario, [nombre, password], (err, result) => {

            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, mensaje: "Error al registrar" });
            }

            const idUsuario = result.insertId;

            const sqlInsertStats = `
                INSERT INTO estadisticas_usuario 
                (id_usuario, numero_partidas, partidas_ganadas, partidas_perdidas, partidas_empatadas, puntos_ganados_totales)
                VALUES (?, 0, 0, 0, 0, 0)
            `;

            db.query(sqlInsertStats, [idUsuario], (err2) => {

                if (err2) {
                    console.error(err2);
                    return res.status(500).json({ success: false, mensaje: "Error al crear estadísticas" });
                }

                return res.json({ success: true, mensaje: "Usuario registrado correctamente" });

            });

        });

    });

});

module.exports = router;