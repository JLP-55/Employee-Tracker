// Required node packages
const inquirer = require("inquirer");
// const mysql = require("mysql2");
const db = require("./config/connection");
require("console.table");

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

//  Add a department
const selectionDept = [
    {
        type: "input",
        name: "name",
        message: "enter the dept name"
    }
];

function addDept () {
    inquirer.prompt(selectionDept) 
        .then((response) => {
            db.query(`
                INSERT INTO department (name) 
                VALUES ("${response.name.replaceAll(" ", "_")}");`)
            db.query("SELECT * FROM department;", (err, results) => {
                console.table(results);
                prompt();
            });
        });
};

// Add a role
const selectionRole = [
    {
        type: "input",
        name: "name",
        message: "please enter the name of your new role"
    }, 
    // {
    //     type: "input",
    //     name: "department",
    //     message: "please enter the department id your new role belongs to"
    // },
    {
        type: "input",
        name: "salary",
        message: "please enter the salary of your new role"
    }
];

function addRole () {
    // query the database to return all the values needed to display to the user their selection for adding a role
    db.query("SELECT * FROM department", (err, results) => {
        if (err) {throw err;}
        console.log("original", results)

        // create a variable and define it as a new array (.map)
        // return the required values, ie, department name and id
        let departmentList =  results.map((dept) => {
            return {
                name: dept.name,
                value: dept.id
            };
        });

        console.log("new!", departmentList);

        // push the new variable department list onto the selectionRole array so that the user can see the values to be selected in inquirer.prompt
        selectionRole.push(
            {
                type: "list",
                name: "department",
                message: "Which department",
                choices: departmentList
            }
        );
   
        inquirer.prompt(selectionRole)
        .then((response) => {
            // console.log(response)
            db.query(`
                INSERT INTO roles (job_title, dept_id, salary)
                VALUES ("${response.name.replaceAll(" ", "_")}", ${response.department}, ${response.salary});`)
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
                    console.table(results);
                    prompt();
                }    
            );
        });
    });
};

// Add an employee
const selectionEmployee = [
    {
        type: "input",
        name: "firstName",
        message: "employees first name"
    },
    {
        type: "input",
        name: "lastName",
        message: "employees last name"
    },
    // {
    //     type: "input",
    //     name: "employeeRole",
    //     message: "employees role id"
    // },
    // {
    //     type: "input",
    //     name: "employeeManager",
    //     message: "employees manager id"
    // }
];

function addEmployee () {

    db.query(`SELECT * FROM employees;`, (err, results) => {
        if (err) {
            throw err;
        };
        // console.log(results)
        let databaseResults = results.map((item) => {
            return {
                manager: item.manager_id
            }
        })
        console.log(databaseResults);
        selectionEmployee.push(
        {
            type: "list",
            name: "employeeManager",
            message: "enter manager name",
            choices: databaseResults
        })
    })

    inquirer.prompt(selectionEmployee)
        .then((response) => {
            db.query(`
                INSERT INTO employees (first_name, last_name, manager_id)
                VALUES ("${response.firstName.replaceAll(" ","_")}", "${response.lastName.replaceAll(" ","_")}", ${response.employeeRole}, ${response.employeeManager});`)
            db.query("SELECT * FROM employees", (err, results) => {
                console.table(results);
                prompt();
            });
        });
};

const selectionUpdateEmployee = [

    {
        type: "list",
        name: "employeeSelection",
        choices: 
        [
            
        ]
        }
]

function updateEmployee () {

    db.query(`SELECT CONCAT (first_name, " ", last_name) FROM employees;`, (err, results) => {
        if (err) {
            throw err;
        };
        console.log(results);
    })

    inquirer.prompt(selectionUpdateEmployee)
        .then((response) => {
            db.query("SELECT * FROM employees;", (err, results) => {
                console.log(results);
                // prompt();
            });
        });
};

function prompt () {
    inquirer.prompt(selectionArray)
    .then((response) => {

        // Conditional statements for user input
        if (response.allItems === "View all departments") {

            db.query("SELECT * FROM department;", (err, results) => {
                console.log("");
                console.log("===============");
                console.log("   VIEWING\nALL DEPARTMENTS");
                console.log("===============");
                console.table(results);
                console.log("===============");
                prompt();
            });

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
                    console.log("==============================================");
                    console.log("              VIEWING ALL ROLES");
                    console.log("==============================================");
                    console.table(results);
                    console.log("==============================================");
                    prompt();
            });

        } else if (response.allItems === "View all employees") {

            db.query(`
                    SELECT
                        t2.id AS employee_id,
                        t2.first_name,
                        t2.last_name,
                        t1.job_title,
                        t3.name AS department,
                        t1.salary,
                        CONCAT (t4.first_name, " ", t4.last_name) AS manager_name
                    FROM
                        employees t2
                    JOIN
                        roles t1
                    ON
                        t2.role_id = t1.id
                    JOIN
                        department t3
                    ON
                        t1.dept_id = t3.id
                    LEFT JOIN
                        employees t4
                    ON
                        t2.manager_id = t4.id;`,
                (err, results) => {
                    if (err) {
                        throw err;
                    };
                console.log("");
                console.log("================================================================================");
                console.log("                             VIEWING ALL EMPLOYEES");
                console.log("================================================================================");
                console.table(results);
                console.log("================================================================================");
                prompt();
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
        message: "Type 'yes' to start"
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
