const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Archivo donde tienes la conexión de la base de datos
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar motor de vistas y directorio de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta para renderizar el formulario
app.get('/', (req, res) => {
    res.render('index');
});

// Ruta para manejar el registro
app.post('/register', (req, res) => {
    const { registerName, registerEmail, registerPassword } = req.body;

    // Validación de datos
    if (!registerName || !registerEmail || !registerPassword) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    // Insertar datos en la base de datos
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [registerName, registerEmail, registerPassword], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al registrar usuario");
        }
        res.redirect('/');
    });
});
