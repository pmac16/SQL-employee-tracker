INSERT INTO department(name)
VALUES
('Toby Macpherson')
('Priya Nathan')
('Jake Levins')
('Lahari Rao')
('Melissa Sheehan')

INSERT INTO role(title, salary, department_id)
VALUES
('Sales Lead', '100000', '1')
('Salesperson', '90000', '2')
('Lead Engineer', '80000', '3')
('Legal Team Lead', '70000', '4')
('Lawyer', '60000', '5')

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Toby', 'Macpherson', '1', '2')
('Priya', 'Nathan', '2')
('Jake', 'Levins', '3')
('Lahari', 'Rao', '4')
('Melissa', 'Sheehan', '5', '4')