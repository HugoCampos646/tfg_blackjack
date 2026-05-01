const express = require("express");
const router = express.Router();

const db = require("../db");

router.post("/", (req, res) => {

    const { usuario, puntos } = req.body;

    const sql = `
        UPDATE usuarios
        SET puntos = ?
        WHERE nombre_usuario = ?
    `;

    db.query(sql, [puntos, usuario], (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                mensaje: "Error servidor"
            });
        }

        return res.json({
            success: true
        });
    });
});

module.exports = router;