//needed dependencies
const express = require("express");
const fs = require("fs");

//Uses callback funtions (req, res) and renders html elements based on passing arguments. 
const app = express();
// telling the web server what port to listen to
const PORT = process.env.PORT || 3000;

// Middleware
// Sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public/public", express.static(__dirname + "/public/public"));

require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});