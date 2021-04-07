const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'employee_db'
});

module.exports = connection