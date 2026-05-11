const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

db.connect(err => {

    if (err) {
        console.error("Error conectando a la BD:", err);
    }

    else {
        console.log("Conectado a MySQL");
    }
});

module.exports = db;