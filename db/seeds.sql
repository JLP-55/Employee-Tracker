INSERT INTO department (name)
VALUES 	("dept_1"),
		("dept_2"),
		("dept_3");


INSERT INTO roles (job_title, dept_id, salary)
VALUES	("CEO", 1, 60),
		("HR", 2, 60),
		("JANITOR", 3, 60);

-- INSERT INTO roles (job_title, dept, salary)
-- VALUES 	(1, "CEO", "dept", 100000),
-- 		(2, "HR", "dept", 100000),
-- 		(3, "JANITOR", "dept", 100000);

-- INSERT INTO roles (job_title, dept, salary)
-- VALUES	(1, "CEO", "dept_one", 1000000),
-- 		(2, "HR", "dept_two", 150000),
-- 		(3, "JANITOR" "dept_three", 99999999999999999999999);

INSERT INTO employees (name, role_id, manager_id)
VALUES 	("Dave", 1, 1),
		("Steve", 2, 2),
		("Tracy", 3, 3);
	