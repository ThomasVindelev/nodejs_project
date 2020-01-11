const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./User");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const dbPath = process.env.DB_CON;
mongoose.connect(dbPath, {
    useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the database");
});

const hallo = "hallo";

app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(5000, () => {
    console.log("Listening on port", 5000);
})

app.get("/", (req, res) => {
    User.find({})
        .then((user) => {
            if (!user) res.send('Ingen users');
            res.json(user);
        })
        .catch(err => console.log(err));
});