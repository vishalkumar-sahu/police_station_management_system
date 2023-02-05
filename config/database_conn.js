const mysql = require('mysql2');

const db = mysql.createConnection({
    user : process.env.USER,
    host : process.env.HOST,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
})

db.connect(function(err) {
    if (err) throw err;
    console.log("MySql connected !!");
});

module.exports = db;