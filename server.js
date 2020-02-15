require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require('path');

//Import default json
const config = require('config')

//Import Routes
const items = require("./routes/api/items");
const users = require("./routes/api/users");

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config

const db = config.get('DB_CONNECTION');

try {
  mongoose.connect(
    db, {
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
app.use("/users/", users);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server has Started on PORT: " + port));