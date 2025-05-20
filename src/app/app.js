const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { sequelize } = require('../db/db');

// Importar rutas
const indexRoutes = require('../routes');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', indexRoutes);

// Sincronizar modelos con la base de datos
sequelize.sync({ alter: true })
    .then(() => {
    console.log('Database synchronized');
    })
    .catch((error) => {
    console.error('Error synchronizing database:', error);
    });

module.exports = app;