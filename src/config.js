require("dotenv").config();

module.exports = {
    app: 
    {
    port: process.env.PORT || 3000,
    },
    jwt: 
    {
    secret: process.env.JWT_SECRET || "",
    },
    mysql: {
        host: process.env.MYSQL_HOST || "localhost",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DB || "generalapi",
    },
};
