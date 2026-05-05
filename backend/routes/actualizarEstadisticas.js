const express = require("express");
const router = express.Router();

const db = require("../db");

router.post("/", (req, res) => {

    const {
        usuario,
        resultado,
        puntosGanados
    } = req.body;

    // obtener id del usuario
    const sqlUsuario = `
        SELECT id_usuario
        FROM usuarios
        WHERE nombre_usuario = ?
    `;

    db.query(sqlUsuario, [usuario], (err, result) => {

        if (err || result.length === 0) {

            return res.status(500).json({
                success: false,
                mensaje: "Usuario no encontrado"
            });
        }

        const idUsuario = result[0].id_usuario;

        let sql = "";

        // victoria
        if (resultado === "ganada") {

            sql = `
                UPDATE estadisticas_usuario
                SET
                    numero_partidas = numero_partidas + 1,
                    partidas_ganadas = partidas_ganadas + 1,
                    puntos_ganados_totales = puntos_ganados_totales + ?
                WHERE id_usuario = ?
            `;
        }

        // derrota
        else if (resultado === "perdida") {

            sql = `
                UPDATE estadisticas_usuario
                SET
                    numero_partidas = numero_partidas + 1,
                    partidas_perdidas = partidas_perdidas + 1
                WHERE id_usuario = ?
            `;
        }

        // empate
        else {

            sql = `
                UPDATE estadisticas_usuario
                SET
                    numero_partidas = numero_partidas + 1,
                    partidas_empatadas = partidas_empatadas + 1
                WHERE id_usuario = ?
            `;
        }

        // ejecutar update
        if (resultado === "ganada") {

            db.query(sql, [puntosGanados, idUsuario], (err2) => {

                if (err2) {

                    return res.status(500).json({
                        success: false
                    });
                }

                return res.json({
                    success: true
                });
            });

        } else {

            db.query(sql, [idUsuario], (err2) => {

                if (err2) {

                    return res.status(500).json({
                        success: false
                    });
                }

                return res.json({
                    success: true
                });
            });
        }
    });
});

module.exports = router;