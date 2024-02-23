// Required node packages
const inquirer = require("inquirer");
const mysql = require("mysql2");

// code to try and get sequelize to work
// const sequelize = require("sequelize");

// const Sequelize = require("sequelize");
// require("dotenv").config();
// sequelize.sync().then(() => {
//     const sequelize = new sequelize(
//         process.env.DB_USER,
//         process.env.DB_NAME,
//         process.env.DB_PASSWORD,

//         {
//             host: "localhost",
//         // user: "root",
//         // password: "0912",
//         // database: "custom_employee_tracker_db"
//         },
//     );
// })

// Create a connection to the mysql server using the variable db
const db = mysql.createConnection (
    {
        host: "localhost",
        user: "root",
        password: "0912",
        database: "custom_employee_tracker_db"
    },
    console.log("Connected successfully")
);

// These questions will be passed the the inquirer prompt.
// Depending on the user selection, different responses will be displayed in the terminal
const selectionArray = [
    {
        type: "list",
        name: "allItems",
        choices:
		[
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role"
        ]
    },
  ]

inquirer.prompt(selectionArray)
    .then((response) => {

        // Conditional statements for user input
        if (response.allItems === "View all departments") {
            console.log("all Departments");

            db.query("SELECT * FROM department;", (err, results) => {
                console.log(results);
            });

        } else if (response.allItems === "View all roles") {
            console.log("all roles");

            db.query("SELECT * FROM roles;", (err, results) => {
                console.log(results);
            });

        } else if (response.allItems === "View all employees") {
            console.log("all employees");

            db.query("SELECT * FROM employees", (err, results) => {
                console.log(results);
            });

        } else if (response.allItems === "Add a department") {
            console.log("adding departments");
        } else if (response.allItems === "Add a role") {
            console.log("adding a role");
        } else if (response.allItems === "Add an employee") {
            console.log("adding and employee ");
        } else if (response.allItems === "Updata an employee role") {
            console.log("updating employee roles");
        };
		
    })
   // .then(function () {
   //      if (db.query) {
   //        process.exit(0);
   //      };
// 	});
