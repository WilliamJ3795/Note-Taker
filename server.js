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