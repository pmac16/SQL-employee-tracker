INSERT INTO department(name)
VALUES
('Sales'),
('Finance'),
('Engineering'),
('Legal');

INSERT INTO role(title, salary, department_id)
VALUES
('Sales Lead', '100000', '1'),
('Sales Person', '90000', '1'),
('Lead Engineer', '80000', '3'),
('Software Engineer', '70000', '3'),
('Accountant', '60000', '2'),
('Legal Team Lead', '1200000', '4'),
('Lawyer', '100000', '4');


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Toby', 'Macpherson', '1', NULL),
('Priya', 'Nathan', '2', '1'),
('Jake', 'Levins', '3', NULL),
('Lahari', 'Rao', '4', '3'),
('Neelam', 'Takhar', '5', NULL),
('Kevin', 'Hoffman', '6', NULL),
('Melissa', 'Sheehan', '7', '6');