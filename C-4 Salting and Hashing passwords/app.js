const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRouter = require("./routes/user.route");

//hashing password + salting

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/register", (req, res) => {
  res.status(201).sendFile(__dirname + "/./views/form.html");
});

app.use(userRouter);
//home route
app.get("/", (req, res) => {
  res.status(200).send("<h1>Home section</h1>");
});

//route not found error
app.use((req, res, next) => {
  res.status(400).send("Requested route is not found");
});

//server error
app.use((err, req, res, next) => {
  res.status(500).send("something broke");
});

module.exports = app;
