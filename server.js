const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
try {
    mongoose.connect(
        process.env.DB_CONNECTION + "", {
            useNewUrlParser: true,
            useCreateIndex: true
        },
        () => {
            console.log("Connected to the Databse");
        }
    );
} catch (err) {
    console.log("DB Error : " + err);
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server has Started"));