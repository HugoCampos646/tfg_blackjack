const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {

    const { usuario, contraseña } = req.body;

    // 1. comprobar usuario + contraseña
    const sqlSelect = "SELECT id_usuario FROM usuarios WHERE nombre_usuario = ? AND password_hash = ?";

    db.query(sqlSelect, [usuario, contraseña], (err, result) => {

        if (err) {
            console.error(err);
            return res.status(500).json({ success: false });
        }

        if (result.length === 0) {
            return res.json({
                success: false,
                mensaje: "Contraseña incorrecta"
            });
        }

        const idUsuario = result[0].id_usuario;

        // 2. borrar movimientos
        const sqlMovimientos = "DELETE FROM movimientos_puntos WHERE id_usuario = ?";

        db.query(sqlMovimientos, [idUsuario], (err2) => {

            if (err2) {
                console.error(err2);
                return res.status(500).json({ success: false });
            }

            // 3. borrar estadísticas
            const sqlEstadisticas = "DELETE FROM estadisticas_usuario WHERE id_usuario = ?";

            db.query(sqlEstadisticas, [idUsuario], (err3) => {

                if (err3) {
                    console.error(err3);
                    return res.status(500).json({ success: false });
                }

                // 4. borrar usuario
                const sqlUsuario = "DELETE FROM usuarios WHERE id_usuario = ?";

                db.query(sqlUsuario, [idUsuario], (err4) => {

                    if (err4) {
                        console.error(err4);
                        return res.status(500).json({ success: false });
                    }

                    return res.json({ success: true });
                });
            });
        });
    });
});

module.exports = router;