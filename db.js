const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Reemplaza con tu usuario de MySQL
    password: 'root', // Reemplaza con tu contraseña de MySQL
    database: 'modava'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

module.exports = db;
