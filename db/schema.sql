DROP DATABASE IF EXISTS custom_employee_tracker_db;
CREATE DATABASE custom_employee_tracker_db;

USE custom_employee_tracker_db;

CREATE TABLE department (
	id INT NOT NULL,
	name VARCHAR(30) NOT NULL
	-- PRIMARY KEY(id)
);

CREATE TABLE roles (
	id INT NOT NULL /*AUTO_INCREMENT*/,
	job_title VARCHAR(30) NOT NULL,
	dept VARCHAR(30) NOT NULL,
	salary INT NOT NULL
	-- FOREIGN KEY(id)
	-- REFERENCES department(id)
);

CREATE TABLE employees (
	id INT NOT NULL,
	name VARCHAR(25) NOT NULL
);
