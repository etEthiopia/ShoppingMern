const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
mongoose.connect(
        process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useCreateIndex: true
        }).then(() => console.log("Database Connected"))
    .catch(err => console.log("DB Error : " + err))

const port = process.env.