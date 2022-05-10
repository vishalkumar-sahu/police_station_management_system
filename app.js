const express = require('express');
const app = express();
const mysql = require('mysql2');

const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(__dirname + '/public'));

app.set('views', 'views/');
app.set('view engine', 'ejs');

// const db = mysql.createConnection({
//     user : process.env.USER,
//     host : process.env.HOST,
//     password : process.env.PASSWORD,
//     database : process.env.DATABASE,
// })

// db.connect(function(err) {
//     if (err) throw err;
//     console.log("MySql connected !!");
// });

//Define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));
app.use('/citizen', require('./routes/citizen'));






const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Connected on port : ${PORT}`);
});
