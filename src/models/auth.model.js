const { sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Auth = sequelize.define(
    "Auth",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notNull: { msg: "email es obligatorio" },
            },
        },
        contraseña: {
            type: DataTypes.STRING(255),
                allowNull: false,
                validate: {
                    notNull: { msg: "Contraseña es obligatoria" },
                },
            },
        },
    {
        timestamps: true,
    }
    );

module.exports = Auth;
