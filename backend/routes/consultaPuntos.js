const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {

    const usuario = req.query.usuario; // lee el parametro de usuaro

    const sql = "SELECT puntos FROM usuarios WHERE nombre_usuario = ?";

    db.query(sql, [usuario], (err, result) => {

        if (err) {
            return res.status(500).json({ success: false });
        }

        if (result.length === 0) {
            return res.json({ success: false });
        }

        return res.json({
            success: true,
            puntos: result[0].puntos
        });
    });

});

module.exports = router;