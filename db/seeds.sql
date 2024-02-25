INSERT INTO department (name)
VALUES 	("dept_1"),
		("dept_2"),
		("dept_3");

INSERT INTO roles (job_title, dept_id, salary)
VALUES	("CEO", 1, 6000),
		("HR", 2, 75000),
		("JANITOR", 3, 105000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 	("Dave", "lastname", 1, 1),
		("Steve", "lastname", 2, 2),
		("Tracy", "lastname", 3, 3);
	