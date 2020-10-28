

// Creates the server and routing possible
const express = require("express");

// sets up handlebars and stores it in variable "handlebars"
const handlebars = require("express-handlebars");

// Request + Cheerio to web scraping!
const request = require("request");
const cheerio = require("cheerio");

const bodyParser = require("body-parser");

// Mongoose js
const mongoose = require("mongoose");

const router = require('./controllers/scrapercontroller.js');

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Server set up stored in var "app"
const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

const port = process.env.PORT || 3000;


// Database configuration for mongoose
mongoose.connect("mongodb://localhost", { useMongoClient: true });

// Hook mongoose connection to db
const db = mongoose.connection;

// Console logs an error if an error is encountered in the database
db.on("error", function (error) {
	console.log("Database Error: ", error);
});

// Log a success message when we connect to our mongoDB collection with no issues
db.once("open", function () {
	console.log("Mongoose connection successful.");
});


// sets the bodyparsers parameters
app.use(bodyParser.urlencoded({ extended: false }));


// Sets a default file for handlebars to render
app.engine("handlebars", handlebars({ defaultLayout: "main" }));

// sets express view engine to handlebars
app.set("view engine", "handlebars");


// routes
app.use("/", router);


// Listens on port 3000
app.listen(port);