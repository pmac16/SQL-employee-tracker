const inquirer = require("inquirer");
const connection = require("./config/connection.js");
require("console.table");

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to Database");
});

const openingPrompts = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee's role",
          "I am done!",
        ],
      },
    ])
    .then((openingAnswer) => {
      if (openingAnswer.task === "View all departments") {
        viewDepartments();
      } else if (openingAnswer.task === "View all roles") {
        viewRoles();
      } else if (openingAnswer.task === "View all employees") {
        viewEmployees();
      } else if (openingAnswer.task === "Add a department") {
        addDepartment();
      } else if (openingAnswer.task === "Add a role") {
        addRole();
      } else if (openingAnswer.task === "Add an employee") {
        addEmployee();
      } else if (openingAnswer.task === "Update an employee's role") {
        updateEmployee();
      } else if (openingAnswer.task === "I am done!") {
        connection.end();
      }
    });
};

const viewDepartments = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    console.log("\n");
    console.table(res);
  });
  openingPrompts();
};

const viewRoles = () => {
  connection.query(
    "SELECT role.title, role.id AS role_id,role.salary, department.name AS department FROM role JOIN department ON (role.department_id = department.id)",
    (err, res) => {
      console.log("\n");
      console.table(res);
    }
  );
  openingPrompts();
};

const viewEmployees = () => {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e.last_name AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee AS e ON employee.manager_id = e.id",
    (err, res) => {
      console.log("\n");
      console.table(res);
    }
  );
  openingPrompts();
};

const addDepartment = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department set ?",
        { name: answer.name },
        (err, res) => {
          console.log("Department added.");
        }
      );
    });
  openingPrompts();
};

const addRole = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for this role?",
        },
        {
          type: "list",
          choices: res,
          name: "department",
          message: "What is department does this role belong to?",
        },
      ])
      .then((answer) => {
        const match = res.find((department) => {
          return department.name === answer.department; //find the object where the darptemnt name matches whatever the user put in
        });
        connection.query(
          "INSERT INTO role set ?",
          {
            title: answer.name,
            salary: answer.salary,
            department_id: match.id,
          },
          (err, res) => {
            if (err) throw err;
            console.log(res);
            console.log("Role added.");
          }
        );
      });
  });
  openingPrompts();
};

const addEmployee = () => {
  connection.query(
    "SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee",
    (err, employeeRes) => {
      connection.query("SELECT id, title AS name FROM role", (err, roleRes) => {
        inquirer
          .prompt([
            {
              type: "input",
              name: "firstName",
              message: "What is the employee's first name?",
            },
            {
              type: "input",
              name: "lastName",
              message: "What is the employee's last name?",
            },
            {
              type: "list",
              choices: roleRes,
              name: "role",
              message: "What is the employee's role?",
              //choices based on the database
              //can the choices be in a separate function with a connection.query and then call the function here?
            },
            {
              type: "list",
              choices: employeeRes,
              name: "manager",
              message: "Who is the employee's manager?",
              //choices from the list of managers
            },
          ])
          .then((answer) => {
            const roleMatch = roleRes.find((role) => {
              return role.name === answer.role;
            });

            const employeeMatch = employeeRes.find((employee) => {
              return employee.name === answer.manager;
            });

            connection.query(
              "INSERT INTO employee set ?",
              {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: roleMatch.id,
                manager_id: employeeMatch.id,
              },
              (err, res) => {
                if (err) throw err;
                console.log(res);
                console.log("Employee added.");
              }
            );
          });
      });
    }
  );
  openingPrompts();
};

const updateEmployee = () => {
  //list of employees query to get list of all employees
  //list of roles to assign to that employee
  connection.query(
    "SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee",
    (err, employeeRes) => {
      connection.query("SELECT id, title AS name FROM role", (err, roleRes) => {
        inquirer
          .prompt([
            {
              type: "list",
              choices: employeeRes,
              name: "employeeList",
              message: "Which employee would you like to update?",
            },
            {
              type: "list",
              choices: roleRes,
              name: "roleList",
              message: "What role do you want to select for this employee?",
            },
          ])
          .then((answer) => {
            const roleMatch = roleRes.find((role) => {
              return role.name === answer.roleList;
            });

            const employeeMatch = employeeRes.find((employee) => {
              return employee.name === answer.employeeList;
            });
            console.log(employeeMatch);
            connection.query(
              "UPDATE employee set ? WHERE ?",
              [
                {
                  role_id: roleMatch.id,
                },
                {
                  id: employeeMatch.id,
                },
              ],
              (err, res) => {
                if (err) throw err;
                console.log(res);
                console.log("Employee added.");
              }
            );
          });
      });
    }
  );
  openingPrompts();
};

//need the options for what to do to come back at the end

openingPrompts();
