//needed dependencies
const express = require("express");
//uuid is the unique identifier for creating the unique id.  
const uuid = require("uuid");

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
app.use("/public/assets", express.static(__dirname + "/public/assets"));

// API Routes - gets the file from index.js and reads it with fs.readfile.
app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", "utf8", function(err, data) {
      //Concatenates dataNotes to the array.
      userNotes = [].concat(JSON.parse(data));
      res.json(JSON.parse(data));
    });
  });

  // Returns the API notes and pushes to to the newNote array.
  app.post("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
      if (error) {
        return console.log(error)
      }
      notes = JSON.parse(notes)
  
      const id = notes[notes.length - 1].id + 1
      const newNote = { title: req.body.title, text: req.body.text, id: id }
      const activeNote = notes.concat(newNote)
  
      fs.writeFile(__dirname + "/db/db.json", JSON.stringify(activeNote), function (error, data) {
        if (error) {
          return error
        }
        console.log(activeNote)
        res.json(activeNote);
      })
    })
  })
  

  //function that returns a response of "note not found" if userNotes does not contain a note.
app.delete("/api/notes/:id", function(req, res) {
    const note = userNotes.find(i => i.id === req.params.id);
    if (!note) return res.send("note not found");
    const index = userNotes.indexOf(note);
    userNotes.splice(index, 1);
    fs.writeFile("./db/db.json", JSON.stringify(userNotes), function(err, data) {
      console.log(err, data);
      res.send(true);
    });
  });
  // HTML Routes

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/assests/index.html"));
  });

app.get("/notes", function(req, res) {
    //function requests a response to get a string from notes.
    res.sendFile(path.join(__dirname, "/public/assets/notes.html"));
  });


  //listens for an assigned port otherwise port 3000 defined at the top.
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));