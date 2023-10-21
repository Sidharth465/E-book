const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const cors = require('cors')
const app = express();
const port = 8000;
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(20)
//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

//google api signin 

// Configure and instantiate Google OAuth2.0 client


//google api sign in





mongoose
  .connect("mongodb+srv://sidhrth:7529269@cluster0.itkfs6l.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });

const userController = require("./controller/userController");
const bookController = require("./controller/bookController");


// Defining routes and connecting them to controllers 
app.post("/register", userController.register);
app.post("/login", userController.login);
app.post("/details", bookController.addBook);
app.get("/verify/:token",userController.verify)
app.get("/library", bookController.getBooks);
app.post("/userdetails",userController.getUserId)
app.post("/delete",bookController.deleteBook)
app.post("/searchbook",bookController.seachBook)
app.put("/updatebook",bookController.updateBook)





app.listen(port, () => {
  console.log("Server is running on port 8000");
});

