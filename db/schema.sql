DROP DATABASE IF EXISTS custom_employee_tracker_db;
CREATE DATABASE custom_employee_tracker_db;

USE custom_employee_tracker_db;

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE roles (
	id INT NOT NULL AUTO_INCREMENT,
	job_title VARCHAR(30) NOT NULL,
	dept_id INT NOT NULL,
	salary INT NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(dept_id)
	REFERENCES department(id)
);

CREATE TABLE employees (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(25) NOT NULL,
	role_id INT NOT NULL,
	manager_id INT,
	PRIMARY KEY(id),
	FOREIGN KEY(role_id)
	REFERENCES roles(id)
	-- FOREIGN KEY(manager_id)
	-- REFERENCES employees(id)
);
