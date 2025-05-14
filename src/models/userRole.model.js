const {DataTypes} = require("sequelize");
const sequelize = require("../db/db");

const UserRole = sequelize.define("user_role", {
    user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    role_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        }
    }, {
        timestamps: false,
        tableName: "user_role",
    });

module.exports = UserRole;