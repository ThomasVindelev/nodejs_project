const express = require("express");
const session = require('express-session');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./User");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.use(session({ secret: process.env.Secret }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(5000, () => { console.log("Listening on port", 5000) });

mongoose.connect(process.env.DB_CON, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", () => { console.log("> error occurred from the database") });
db.once("open", () => { console.log("> successfully opened the database") });

/**
 * ROUTES
 */
app.get("/", (req, res) => {
    res.render('index');
});

app.get("/dashboard", (req, res) => {
    if (!req.session.loggedin) res.redirect('/');
    res.render('dashboard', { user: req.session });
})

app.get("/dashboard/createuser", (req, res) => {
    //Admin side
});

app.post("/create/user", (req, res) => {
    //Create user functionality.
});

app.post("/login", (req, res) => {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.redirect('/');
        } else {
            req.session.loggedin = true;
            req.session.username = user.username;
            req.session.firstname = user.firstname;
            req.session.lastname = user.lastname;
            req.session.email = user.email;
            res.redirect('/dashboard');
        }
    })
});