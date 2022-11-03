//needed dependencies
const express = require("express");

const path = require("path");
//responsible for all file operations, asynchronous and synchronous
const fs = require("fs");
//Uses callback funtions (req, res) and renders html elements based on passing arguments. 
const app = express();

// telling the web server what port to listen to
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


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
  });

  // Pull from db.json
app.get("/api/notes", function (req, res) {
  fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, data) {
    if (error) {
      return console.log(error)
    }
    console.log("This is Notes", data)
    res.json(JSON.parse(data))
  })
});
  

app.delete("/api/notes/:id", function (req, res) {
  const noteId = JSON.parse(req.params.id)
  console.log(noteId)
  fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
    if (error) {
      return console.log(error)
    }
    notes = JSON.parse(notes)

    notes = notes.filter(val => val.id !== noteId)

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function (error, data) {
      if (error) {
        return error
      }
      res.json(notes)
    })
  })
});

app.put("/api/notes/:id", function(req, res) {
  const noteId = JSON.parse(req.params.id)
  console.log(noteId)
  fs.readFile(__dirname + "/db/db.json", "utf8", function(error, notes) {
    if (error ){
      return console.log(error)
    }
    notes.JSONparse(notes)

    notes = notes.filter(val => val.id !== noteId)

    fs.writeFile(__dirname +"/db/db.json", JSON.stringify(notes), function (error, data) {
      if (error) {
        return error
      }
      res.json(notes)
    })
  })
});


  // HTML Routes

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

app.get("/notes", function(req, res) {
    //function requests a response to get a string from notes.
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });


  //listens for an assigned port otherwise port 3000 defined at the top.

  app.listen(PORT, () => console.log(`App listening on PORT: http://localhost:${PORT}`));