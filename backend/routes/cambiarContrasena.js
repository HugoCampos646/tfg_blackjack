const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {

    const { usuario, contraseñaActual, contraseñaNueva } = req.body;

    // comprobar contraseña actual
    const sqlSelect = "SELECT * FROM usuarios WHERE nombre_usuario = ? AND password_hash = ?";

    db.query(sqlSelect, [usuario, contraseñaActual], (err, result) => {

        if (err) {
            console.error(err);
            return res.status(500).json({ success: false });
        }

        if (result.length === 0) {
            return res.json({
                success: false,
                mensaje: "Contraseña actual incorrecta"
            });
        }

        // actualizar contraseña
        const sqlUpdate = "UPDATE usuarios SET password_hash = ? WHERE nombre_usuario = ?";

        db.query(sqlUpdate, [contraseñaNueva, usuario], (err2, result2) => {

            if (err2) {
                console.error(err2); // 👈 importante
                return res.status(500).json({ success: false });
            }

            return res.json({ success: true });
        });
    });
});

module.exports = router;