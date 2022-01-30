const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose')
const studentAPI = require("./server/routes/studentAPI");
const adminAPI = require("./server/routes/adminAPI");
const authAPI = require("./server/routes/authAPI");

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/finalProjectDB', { useNewUrlParser: true })
//might need useUnifiedTopology: true

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/student", studentAPI);
app.use("/admin", adminAPI);
app.use("/auth", authAPI);


const port = 8888;
app.listen(port, function () {
  console.log(`Running server on port ${port}`);
});
