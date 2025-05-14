const {DataTypes} = require("sequelize");
const sequelize = require("../db/db");

const Post = sequelize.define("Post", {
    post_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT,
    },
}, {
    timestamps: true,
    paranoid: true,
});

module.exports = Post;
