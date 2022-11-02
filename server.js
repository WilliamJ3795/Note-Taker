//needed dependencies
const express = require("express");
//uuid is the unique identifier for creating the unique id.  
const uuid = require("uuid");
//path is used for handling and transforming file paths. 
const path = require("path");
//responsible for all file operations, asynchronous and synchronous
const fs = require("fs");
//Uses callback funtions (req, res) and renders html elements based on passing arguments. 
const app = express();

// telling the web server what port to listen to
const PORT = process.env.PORT || 3000;
let userNotes = [];

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// API Routes - gets the file from index.js and reads it with fs.readfile.
app.get("/api/notes", function(req, res) {
    fs.readFile("db/db.json", "utf8", function(err, data) {
      //Concatenates dataNotes to the array.
      Notes = [].concat(JSON.parse(data));
      res.json(JSON.parse(data));
    });
  });

  // Returns the API notes and pushes to to the newNote array.
app.post("/api/notes", function(req, res) {
    const newNote = { id: uuid(), ...req.body };
    userNotes.push(newNote);
    fs.writeFile("db/db.json", JSON.stringify(userNotes), function(
      //call back function for when data is made.
      err,
      data
    ) {
      console.log(err, data);
      //sends the response to newNote
      res.send(newNote);
    });
  });