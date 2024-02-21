// Required node packages
const inquirer = require("inquirer");
const mysql = require("mysql2");

// Create a connection to the mysql server using the variable db
const db = mysql.createConnection (
    {
        host: "localhost",
        user: "root",
        password: "0912",
        database: "employees"
    },
    console.log("Connected successfully")
);

// These questions will be passed the the inquirer prompt.
// Depending on the user selection, different responses will be displayed in the terminal
const selectionArray = [
    {
        type: "list",
        name: "allItems",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role"
        ]
    },
    // {
    //     type: "confirm",
    //     name: "dept_selection",
    //     message: "View all departments?"
    // },
]

inquirer.prompt(selectionArray)
    .then((response) => {

        // Conditional statements for user input
        if (response.allItems === "View all departments") {
            console.log("all Departments");

            db.query("SELECT * FROM departments;", (err, results) => {
                console.log(results);
            });
        } else if (response.allItems === "View all roles") {
            console.log("all roles")
        } else if (response.allItems === "View all employees") {
            console.log("all employees")
        };
    })
    .then(function () {})