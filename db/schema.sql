DROP DATABASE IF EXISTS custom_employee_tracker_db;
CREATE DATABASE custom_employee_tracker_db;

USE custom_employee_tracker_db;

CREATE TABLE department (
	id INT NOT NULL,
	name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
	id INT NOT NULL,
	name VARCHAR(30) NOT NULL
);

CREATE TABLE employees (
	id INT NOT NULL,
	name VARCHAR(25) NOT NULL
);
