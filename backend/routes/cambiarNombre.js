const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {

    const { usuarioActual, nuevoNombre } = req.body;

    const sql = "UPDATE usuarios SET nombre_usuario = ? WHERE nombre_usuario = ?";

    db.query(sql, [nuevoNombre, usuarioActual], (err, result) => {

        if (err) {
            return res.status(500).json({ success: false });
        }

        if (result.affectedRows === 0) {
            return res.json({ success: false });
        }

        return res.json({ success: true });
    });
});

module.exports = router;