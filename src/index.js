    require('dotenv').config();
    const express = require('express');
    const mongoose = require('mongoose');

    const app = express();
    const PORT = process.env.PORT || 3000;

    // Middleware
    app.use(express.json());

    // Conexión a la base de datos
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error de conexión:', err));

    // Rutas
    app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
    });

    // Iniciar el servidor
    app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
