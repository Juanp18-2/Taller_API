const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define( 
    "User", 
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            },
        Primer_Nombre: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
        notNull: { msg: "Primer nombre es obligatorio" },
            },
        },
        Segundo_Nombre: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                notNull: { msg: "Segundo nombre es obligatorio" },
            },
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
        telefono:{
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                notNull: { msg: "telefono es obligatorio" },
            },
        },
        avatar:{
            type: DataTypes.STRING(100),
            },
        imagePath: {
            type: DataTypes.STRING(150),
            },
        },
        {
            timestamps: true,
        }
        );

module.exports = User;
