INSERT INTO department (name)
VALUES 	("dept_1"),
		("dept_2"),
		("dept_3");

INSERT INTO roles (job_title, dept_id, salary)
VALUES	("CEO", 1, 160000),
		("Human resources", 2, 75000),
		("Janitor", 3, 35000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 	("Dave", "Smith", 1, NULL),
		("Tracy", "Goodwyne", 2, 1),
		("Steve", "Brown", 3, 2);
	