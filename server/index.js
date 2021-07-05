const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const { response } = require("express");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "loginregister_reactjs",
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sqlCheck = "SELECT * from user WHERE Email=?";
    db.query(sqlCheck, [email], (err, result) => {
        if (err) {
            res.send({ error: err });
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].Password, (error, response) => {
                if (response) {
                    res.send({ message: "Login Successful" });
                    //res.send(result);
                } else {
                    res.send({ message: "Invalid Email or Password!" });
                }
            });
        } else {
            res.send({ message: "Invalid Email or Password!" });
        }
    });
});

app.post("/register", async(req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;

    const sqlCheck = "SELECT * from user WHERE Email=?";
    db.query(sqlCheck, [email], (err, result) => {
        if (err) {
            res.send({ error: err });
        }
        if (result.length == 0) {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.log(err);
                }

                const sqlIns =
                    "INSERT INTO user(Name,Email,Password,Phone) VALUES (?,?,?,?)";
                db.query(
                    sqlIns, [userName, email, hash, phone],
                    (err, result) => {
                        if (err) {
                            res.send({ error: err });
                        }
                        res.send({ message: "Register Successful!" });


                    }
                );
            });
        } else {
            res.send({ message: "Email already exists!" });
        }
    });


});

app.listen(3001, () => {});