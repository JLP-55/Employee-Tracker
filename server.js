// Required node packages
const inquirer = require("inquirer");
const db = require("./config/connection");
require("console.table");

// Main questions array
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
        message: "enter the department name"
    }
];

function addDept () {
    inquirer.prompt(selectionDept) 
        .then((response) => {
            db.query(`
                INSERT INTO department (name) 
                VALUES ("${response.name.replaceAll(" ", "_")}");`)
            db.query("SELECT * FROM department;", (err, results) => {
                console.log("");
                console.log("===============");
                console.log("   VIEWING\nALL DEPARTMENTS");
                console.log("===============");
                console.table(results);
                console.log("===============");
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
    {
        type: "input",
        name: "salary",
        message: "please enter the salary of your new role"
    }
];

function addRole () {
    // query the database to return all the values needed to display to the user their selection for adding a role
    db.query("SELECT * FROM department", (err, results) => {

        if (err) {
            throw err;
        };

        // create a variable and define it as a new array (.map)
        // return the required values, ie, department name and id
        let departmentList = results.map((dept) => {
            return {
                name: dept.name,
                value: dept.id
            };
        });

        // push the new variable department list onto the selectionRole array so that the user can see the values to be selected in inquirer.prompt
        selectionRole.push(
            {
                type: "list",
                name: "department",
                message: "Which department does the new role belong to?",
                choices: departmentList
            }
        );
   
        inquirer.prompt(selectionRole)
        .then((response) => {

            db.query(`
                INSERT INTO roles (job_title, dept_id, salary)
                VALUES ("${response.name.replaceAll(" ", "_")}", ${response.department}, ${response.salary});`)

            db.query(`
                    SELECT 
                        t2.id,
                        t2.job_title AS title, 
                        t1.name AS department,
                        t2.salary
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
];

function addEmployee () {

    // select, map and push all names from the employees table for the user to select as their manager,
    // making sure to return a name and value pair for use in the inquirer choices for the list type
   db.query(`SELECT * FROM employees;`, (err, results) => {

        let databaseResultsManager = results.map((employee) => {
            return {
                name: employee.first_name,
                value: employee.role_id
                // value: employee.manager_id
            };
        });

        selectionEmployee.push(
            {
                type: "list",
                name: "employeeManager",
                message: "enter manager name",
                choices: databaseResultsManager
            }
        );

        db.query(`SELECT * FROM department t1 JOIN roles t2 ON t1.id = t2.dept_id;`, (err, results) => {

            if (err) {
                throw err;
            };

            let databaseResultsRole = results.map((role) => {
                return {
                    name: role.job_title,
                    value: role.dept_id
                }
            });

            selectionEmployee.push(
                {
                    type: "list",
                    name: "employeeRole",
                    message: "what is the employees role?",
                    choices: databaseResultsRole
                }
            );

            // pass in the selectionEmployees array to inquirer, and then query the database in the response, 
            // insert into the employees table, all relevant values.
            // then query the database, selecting relevant info from employees, console.table the results and call the prompt function
            inquirer.prompt(selectionEmployee)
            .then((response) => {
                db.query(`
                    INSERT INTO employees (first_name, last_name, role_id, manager_id)
                    VALUES ("${response.firstName.replaceAll(" ","_")}", "${response.lastName.replaceAll(" ","_")}", ${response.employeeRole}, ${response.employeeManager});`, (err, results) => {
                        if (err) {
                            throw err;
                        }
                    });

                 db.query(`
                    SELECT
                        t2.id,
                        t2.first_name,
                        t2.last_name,
                        t1.job_title AS title,
                        t3.name AS department,
                        t1.salary,
                        CONCAT (t4.first_name, " ", t4.last_name) AS manager
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
                console.log("===========================================================================");
                console.log("                          VIEWING ALL EMPLOYEES");
                console.log("===========================================================================");
                console.table(results);
                console.log("===========================================================================");
                prompt();
            });

            });
        });
    });
};

// update an employee
const selectionUpdateEmployee = []

function updateEmployee () {

    db.query(`SELECT t1.job_title, t2.first_name, t2.id, t2.role_id FROM roles t1 JOIN employees t2 ON t1.id = t2.role_id;`, (err, results) => {
        if (err) {
            throw err;
        };

        let updateEmployeeResultsName = results.map((updateEmployee) => {
            return {
                name: updateEmployee.first_name,
                value: updateEmployee.id            
            }
        })

        selectionUpdateEmployee.push(
        {
            type: "list",
            name: "name",
            message: "what employee's role do you want to update?",
            choices: updateEmployeeResultsName
        })

        let updateEmployeeResultsRole = results.map((updateEmployee) => {
            return {
                name: updateEmployee.job_title,
                value: updateEmployee.role_id
            }
        })

        selectionUpdateEmployee.push(
            {
                type: "list",
                name: "role",
                message: "what new role are you assigning to the employee?",
                choices: updateEmployeeResultsRole
            }
        )

        inquirer.prompt(selectionUpdateEmployee)
        .then((response) => {
            db.query(`UPDATE employees SET role_id = ${response.role} WHERE id = ${response.name};`, (err, results) => {
                if (err) {
                    throw err;
                }

                db.query(`
                        SELECT
                            t2.id,
                            t2.first_name,
                            t2.last_name,
                            t1.job_title AS title,
                            t3.name AS department,
                            t1.salary,
                            CONCAT (t4.first_name, " ", t4.last_name) AS manager
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
                    console.log("===========================================================================");
                    console.log("                          VIEWING ALL EMPLOYEES");
                    console.log("===========================================================================");
                    console.table(results);
                    console.log("===========================================================================");
                    prompt();
                });
            
            });
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
                        t2.id,
                        t2.job_title AS title, 
                        t1.name AS department,
                        t2.salary
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
                        t2.id,
                        t2.first_name,
                        t2.last_name,
                        t1.job_title AS title,
                        t3.name AS department,
                        t1.salary,
                        CONCAT (t4.first_name, " ", t4.last_name) AS manager
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
                console.log("===========================================================================");
                console.log("                          VIEWING ALL EMPLOYEES");
                console.log("===========================================================================");
                console.table(results);
                console.log("===========================================================================");
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
