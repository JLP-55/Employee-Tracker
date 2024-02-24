// Required node packages
const inquirer = require("inquirer");
// const mysql = require("mysql2");
const db = require("./config/connection")

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

const selectionDept = [
    {
        type: "input",
        name: "id",
        message: "enter the dept id"
    },
    {
        type: "input",
        name: "name",
        message: "enter the dept name"
    }
]

function addDept () {
    inquirer.prompt(selectionDept) 
        .then((response) => {
            db.query(`
                INSERT INTO department (id, name) 
                VALUES (${response.id}, "${response.name.replaceAll(" ", "_")}");`)
            db.query("SELECT * FROM department;", (err, results) => {
                console.log(results);
            });
        })
    }

const selectionRole = [
    {
        type: "input",
        name: "id",
        message: "please enter the id..."
    },
    {
        type: "input",
        name: "name",
        message: "please enter the name of your new role"
    }, 
    {
        type: "input",
        name: "department",
        message: "please enter the department your new role belongs to"
    },
    {
        type: "input",
        name: "salary",
        message: "please enter the salary of your new role"
    }
]

function addRole () {
    inquirer.prompt(selectionRole)
        .then((response) => {
            db.query(`
                INSERT INTO roles (id, job_title, dept, salary)
                VALUES (${response.id},"${response.name}","${response.department}","${response.salary}");`)
            db.query("SELECT * FROM roles", (err, results) => {
                console.log(results);
            })
        })
}

const selectionEmployee = [
    {
        type: "input",
        name: "employeeId",
        message: "employees id"
    }, 
    {
        type: "input",
        name: "employeeName",
        message: "employees full name"
    },
    {
        type: "input",
        name: "employeeRole",
        message: "employees role"
    },
    {
        type: "input",
        name: "employeeManager",
        message: "employees manager"
    }
]

function addEmployee () {
    inquirer.prompt(selectionEmployee)
        .then((response) => {
            db.query(`
                INSERT INTO employees (id, name, role, manager)
                VALUES (${response.employeeId}, "${response.employeeName.replaceAll(" ", "_")}", "${response.employeeRole.replaceAll(" ","_")}", "${response.employeeManager.replaceAll(" ","_")}");`)
            db.query("SELECT * FROM employees", (err, results) => {
                console.log(results);
            })
        })
}

const selectionUpdateEmployee = [

    {
        type: "list",
        name: "employeeSelection",
        choices: 
        [
            `${db.query(`SELECT name FROM employees;`)}`
        ]
    }
]

function updateEmployee () {
    inquirer.prompt(selectionUpdateEmployee)
        .then((response) => {
            db.query("SELECT * FROM employees;", (err, results) => {
                console.log(results);
            })
        })
}

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
            addDept();

        } else if (response.allItems === "Add a role") {
            console.log("adding a role");
            addRole();

        } else if (response.allItems === "Add an employee") {
            console.log("adding and employee ");
            addEmployee();

        } else if (response.allItems === "Update an employee role") {
            console.log("updating employee roles");
            updateEmployee();
        };	
    })
