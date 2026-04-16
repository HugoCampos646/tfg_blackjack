const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {

    const { usuario, puntos } = req.body;

    // VALIDACIONES BACKEND
    if (!usuario || !puntos) {
        return res.json({
            success: false,
            mensaje: "Datos incompletos"
        });
    }

    if (isNaN(puntos)) {
        return res.json({
            success: false,
            mensaje: "Los puntos deben ser un número"
        });
    }

    if (puntos <= 0 || puntos > 1000) {
        return res.json({
            success: false,
            mensaje: "Cantidad inválida (1 - 1000)"
        });
    }

    // sumar puntos
    const sqlUpdate = `
        UPDATE usuarios 
        SET puntos = puntos + ? 
        WHERE nombre_usuario = ?
    `;

    db.query(sqlUpdate, [puntos, usuario], (err, result) => {

        if (err) {
            console.error(err);
            return res.status(500).json({ success: false });
        }

        if (result.affectedRows === 0) {
            return res.json({
                success: false,
                mensaje: "Usuario no encontrado"
            });
        }

        // registrar movimiento
        const sqlMovimiento = `
            INSERT INTO movimientos_puntos (id_usuario, cantidad)
            VALUES (
                (SELECT id_usuario FROM usuarios WHERE nombre_usuario = ?),
                ?
            )
        `;

        db.query(sqlMovimiento, [usuario, puntos], (err2) => {

            if (err2) {
                console.error(err2);
                return res.status(500).json({ success: false });
            }

            return res.json({ success: true });
        });
    });
});

module.exports = router;