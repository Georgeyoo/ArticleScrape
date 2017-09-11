//Dependencies

		// Creates the server and routing possible
		var express = require("express");

		// sets up handlebars and stores it in variable "handlebars"
		var handlebars = require("express-handlebars");

		// Request + Cheerio to web scraping!
		var request = require("request");
		var cheerio = require("cheerio");

		var bodyParser = require("body-parser");

		// Mongoose js
		var mongoose = require("mongoose");

			// Set mongoose to leverage built in JavaScript ES6 Promises
			mongoose.Promise = Promise;




// Server setup 

		// Server set up stored in var "app"
		var app = express();

		// Serve static content for the app from the "public" directory in the application directory.
		app.use(express.static("public"));

		var port = process.env.PORT || 3000;


// Database Setup

		// Database configuration for mongoose
		mongoose.connect("mongodb://localhost");
		
		// Hook mongoose connection to db
		var db = mongoose.connection;

		// Console logs an error if an error is encountered in the database
		db.on("error", function(error) {
			console.log("Database Error: ", error);
		});

		// Log a success message when we connect to our mongoDB collection with no issues
		db.once("open", function() {
		  console.log("Mongoose connection successful.");
		});




// Body Parser Setup

		// sets the bodyparsers parameters
		app.use(bodyParser.urlencoded({ extended: false }));



// Handlebars Set up

		// Sets a default file for handlebars to render
		app.engine("handlebars", handlebars({defaultLayout: "main"}));
		
		// sets express view engine to handlebars
		app.set("view engine", "handlebars");



// Routes

		var router = require('./controllers/scrapercontroller.js');
		app.use("/", router);




// Listens on port 3000
app.listen(port);