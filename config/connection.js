const mysql = require("mysql2");

require("dotenv").config();

const db = mysql.createConnection (
    {
        host: "localhost",
        user: "root",
        password: process.env.DB_PASSWORD,
        database: "custom_employee_tracker_db"
    },
    console.log("Connected successfully")
);

module.exports = db;