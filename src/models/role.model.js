const { DataTypes} = require("sequelize");
const sequelize = require("../db/db");

const Role = sequelize.define("Role", {
    role_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
},{
    timestamps: true,
});

module.exports = Role;