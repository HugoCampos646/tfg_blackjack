const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {

    const { usuario } = req.query;

    const sql = `
        SELECT e.*
        FROM estadisticas_usuario e
        JOIN usuarios u ON e.id_usuario = u.id_usuario
        WHERE u.nombre_usuario = ?
    `;

    db.query(sql, [usuario], (err, result) => {

        if (err) {
            console.error(err);
            return res.status(500).json({ success: false });
        }

        if (result.length === 0) {
            return res.json({ success: false });
        }

        return res.json({
            success: true,
            estadisticas: result[0]
        });
    });
});

module.exports = router;