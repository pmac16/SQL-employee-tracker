DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;


INSERT TABLE department(
    id INTEGER PRIMARY KEY,
    name VARCHAR(30) NOT NULL
)

INSERT TABLE role(
    id INTEGER PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id: INTEGER NOT NULL,
)

INSERT TABLE employee(
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER
)