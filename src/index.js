const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const sequelize = require("./config/database");
const User = require("./models/user.model");
const Auth = require("./models/auth.model");

await sequelize.sync({ alter: true });

const app = express();
require("dotenv").config();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("API funcionando correctamente"));

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión con base de datos exitosa");
    } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    }
    console.log("Servidor escuchando en http://localhost:${PORT}");
});
