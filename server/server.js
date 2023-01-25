const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 4000;
let Thred = require('./thred.model');

app.use(cors());

mongoose.set("strictQuery", true);

mongoose.connect(
  "mongodb+srv://lindbranch:Sommar12@iskenscluster.iyct204.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.use(bodyParser.json());

const thredRoutes = express.Router();

//get all
thredRoutes.route("/").get(function (req, res) {
  Thred.find(function (err, threds) {
    if (err) {
      console.log(err);
    } else {
      res.json(threds);
    }
  });
});
//find by ID
thredRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Todo.findById(id, function (err, thred) {
    res.json(thred);
  });
});

//ADD
thredRoutes.route("/add").post(function (req, res) {
  let thred = new Todo(req.body);
  thred
    .save()
    .then((thred) => {
      res.status(200).json({ thred: "thred added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new thred failed");
    });
});

//update
thredRoutes.route("/update/:id").post(function (req, res) {
  Thred.findById(req.params.id, function (err, thred) {
    if (!thred) res.status(404).send("data is not found");

    else thred.thred_title = req.body.thred_title;

    thred.thred_body = req.body.thred_body;

    thred.todo_priority = req.body.todo_priority;
    

    thred
      .save()
      .then((thred) => {
        res.json("thred updated!");
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
});

app.use("/threds", thredRoutes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
