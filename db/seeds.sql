INSERT INTO department (id, name)
VALUES 	(1, "dept_1"),
		(2, "dept_2"),
		(3, "dept_3");


INSERT INTO roles (id, job_title, dept, salary)
VALUES	(1, "CEO", "dept", 60),
		(2, "HR", "dept", 60),
		(3, "JANITOR", "dept", 60);

-- INSERT INTO roles (id, job_title, dept, salary)
-- VALUES 	(1, "CEO", "dept", 100000),
-- 		(2, "HR", "dept", 100000),
-- 		(3, "JANITOR", "dept", 100000);

-- INSERT INTO roles (id, job_title, dept, salary)
-- VALUES	(1, "CEO", "dept_one", 1000000),
-- 		(2, "HR", "dept_two", 150000),
-- 		(3, "JANITOR" "dept_three", 99999999999999999999999);

INSERT INTO employees (id, name, role, manager)
VALUES 	(1, "Dave", "CEO", "no_manager"),
		(2, "Steve", "janitor", "CEO"),
		(3, "Tracy", "HR", "CEO");
	