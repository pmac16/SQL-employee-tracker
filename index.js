const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1012Brooklyn!',
    database: 'employee_db'
});

connection.connect((err) => {
    console.log('Connected to Database')
})

const openingPrompts = () => {
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'task',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee'] 
        }
    ])
    .then((openingAnswer) => {
        if(openingAnswer.task === 'View all departments') {
            //departments function
            viewDepartments();
        } else if (openingAnswer.task === 'View all roles') {
            //roles function
        } else if (openingAnswer.task === 'View all employees') {
            //view employees function
        } else if (openingAnswer.task === 'Add a department') {
            addDepartment();
        } else if (openingAnswer.task === 'Add a role') {
            addRole();
        } else if (openingAnswer.task === 'Add an employee') {
            addEmployee();
        } else {
            //update an employee function
        }
    })
}

const viewDepartments = () => {
    connection.query(
        "SELECT * FROM department", 
        (err, res) => {
            console.table(res)
        }
    )
}

const addDepartment = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
        }
    ]).then((answer) => {
        connection.query(
            "INSERT INTO department set ?",
            {name:answer.name},
            (err,res) => {
                console.log('Department added.')
            }
        )
    })
}

const addRole = () => {
    connection.query(
        "SELECT * FROM department",
        (err, res) => {

    
    inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'list',
            choices: res,
            name: 'department',
            message: 'What is department does this role belong to?'


        }
        
    ]).then((answer) => {
        console.log(answer)
        console.log(res)
    })
}
)
   
}

const addEmployee = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?"
        },
        {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            //choices based on the database 
        },
        {
            type: 'input',
            name: 'manager',
            message: "Who is the employee's manager?",
            //choices from the list of managers 
        }

    ])
    //then employee is added to the database 
}

openingPrompts();