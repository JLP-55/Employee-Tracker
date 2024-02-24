INSERT INTO department (id, name)
VALUES 	(1, "dept_1"),
		(2, "dept_2"),
		(3, "dept_3");


INSERT INTO roles (id, job_title, dept_id, salary)
VALUES	(1, "CEO", 1, 60),
		(2, "HR", 2, 60),
		(3, "JANITOR", 3, 60);

-- INSERT INTO roles (id, job_title, dept, salary)
-- VALUES 	(1, "CEO", "dept", 100000),
-- 		(2, "HR", "dept", 100000),
-- 		(3, "JANITOR", "dept", 100000);

-- INSERT INTO roles (id, job_title, dept, salary)
-- VALUES	(1, "CEO", "dept_one", 1000000),
-- 		(2, "HR", "dept_two", 150000),
-- 		(3, "JANITOR" "dept_three", 99999999999999999999999);

INSERT INTO employees (id, name, role_id, manager_id)
VALUES 	(1, "Dave", 1, 1),
		(2, "Steve", 2, 2),
		(3, "Tracy", 3, 3);
	