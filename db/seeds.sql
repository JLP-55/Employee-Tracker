INSERT INTO department (name)
VALUES 	("dept_1"),
		("dept_2"),
		("dept_3");

INSERT INTO roles (job_title, dept_id, salary)
VALUES	("CEO", 1, 6000),
		("HR", 2, 75000),
		("JANITOR", 3, 105000);

INSERT INTO employees (name, role_id, manager_id)
VALUES 	("Dave", 1, 1),
		("Steve", 2, 2),
		("Tracy", 3, 3);
	