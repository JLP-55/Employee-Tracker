// Required node packages
const inquirer = require("inquirer");
// const mysql = require("mysql2");
const db = require("./config/connection");
const responseTabel = require("console.table");

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
            "Update an employee role",
            "Exit"
        ]
    },
]

const selectionDept = [
    // {
    //     type: "input",
    //     name: "id",
    //     message: "enter the dept id"
    // },
    {
        type: "input",
        name: "name",
        message: "enter the dept name"
    }
]

// const addDept = async () => {
//         const prompt = await inquirer.prompt(selectionDept) 

//         .then((response) => {
//             db.query(`
//                 INSERT INTO department (id, name) 
//                 VALUES (${response.id}, "${response.name.replaceAll(" ", "_")}");`)
//             db.query("SELECT * FROM department;", (err, results) => {
//                 console.log(results);
//             });
//         })
// }

function addDept () {
    inquirer.prompt(selectionDept) 
        .then((response) => {
            db.query(`
                INSERT INTO department (name) 
                VALUES ("${response.name.replaceAll(" ", "_")}");`)
            db.query("SELECT * FROM department;", (err, results) => {
                console.table(results);
            });
        })
        // .then((response) => {
        //     console.table(response)
        // })
        // if (response) {

        // // prompt();
        // }
}

const selectionRole = [
    // {
    //     type: "input",
    //     name: "id",
    //     message: "please enter the id..."
    // },
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
                INSERT INTO roles (job_title, dept_id, salary)
                VALUES ("${response.name}", ${response.department}, ${response.salary});`)
            db.query("SELECT * FROM roles", (err, results) => {
                console.table(results);
            })
        })
        // prompt();
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
        // prompt();
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
        // .then (() => {
        //     prompt       
        // })
}

function prompt () {
    inquirer.prompt(selectionArray)
    .then((response) => {

        // Conditional statements for user input
        if (response.allItems === "View all departments") {

            db.query("SELECT * FROM department;", (err, results) => {
                console.log("");
                console.log("===================");
                console.log("VIEWING ALL DEPARTMENTS");
                console.log("===================");
                console.table(results);
                console.log("===================");
            });
            prompt();

        } else if (response.allItems === "View all roles") {

            db.query(`
                    SELECT 
                        t2.id AS role_id,
                        t2.job_title, 
                        t2.salary,
                        t1.name AS linked_department
                    FROM
                        roles t2
                    JOIN
                        department t1
                    ON
                        t2.dept_id = t1.id;`, 

                    (err, results) => {

                    console.log("");
                    console.log("===============================");
                    console.log("VIEWING ALL ROLES");
                    console.log("===============================");
                    console.table(results);
                    console.log("===============================");
            });
            prompt();

        } else if (response.allItems === "View all employees") {

            db.query(`
                    SELECT
                        t2.id AS employee_id,
                        t2.name AS employee_name,
                        t1.job_title,
                        t1.dept_id AS department_id,
                        t1.salary,
                        t2.manager_id
                    FROM
                        employees t2
                    JOIN
                        roles t1
                    ON
                        t2.role_id = t1.id;`, 
                (err, results) => {
                console.log("");
                console.log("==============================");
                console.log("VIEWING ALL EMPLOYEES");
                console.log("==============================");
                console.table(results);
                console.log("==============================");
            });
            prompt();

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
        } else if (response.allItems === "Exit") {
            process.exit(0);
        }
    });
};

// code to initialise the app, so that the callback to prompt can only run once
const initArray = [
    {
        type: "confirm",
        name: "init",
        message: "Start?"
    }
];

inquirer.prompt(initArray)
.then((response) => {
    if (response.init) {
        prompt();
    } else {
        process.exit(0);
    };
});
