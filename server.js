require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Import Routes
const items = require("./routes/api/items");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
try {
  mongoose.connect(
    process.env.DB_CONNECTION,
    {
      useNewUrlParser: true,
      useCreateIndex: true
    },
    () => {
      console.log("Connected to the Databse ");
    }
  );
} catch (err) {
  console.log("DB Error : " + err);
}

// Configure Routes
app.use("/items/", items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server has Started on PORT: " + port));
