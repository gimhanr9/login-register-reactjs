const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loginregister_reactjs'
});

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.get("/", (req, res) => {



});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const sqlCheck = "SELECT * from user WHERE Email=? AND Password=?"
    db.query(sqlCheck, [email, password], (err, result) => {
        if (err) {
            res.send({ error: err });
        }
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ message: "Invalid Email or Password!" });
        }
    });

});

app.post("/register", (req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const sqlIns = "INSERT INTO user(Name,Email,Password,Phone) VALUES (?,?,?,?)";
    db.query(sqlIns, [userName, email, password, phone], (err, result) => {

    });


});

app.listen(3001, () => {

});