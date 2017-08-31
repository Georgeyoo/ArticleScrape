//Dependencies

		// Creates the server and routing possible
		var express = require("express");

		// sets up handlebars and stores it in variable "handlebars"
		var handlebars = require("express-handlebars");

		// Allows storage to mongodb using Node
		var mongojs = require("mongojs");

		// Request + Cheerio to web scraping!
		var request = require("request");
		var cheerio = require("cheerio");

		var bodyParser = require("body-parser");


// Server setup 

		// Server set up stored in var "app"
		var app = express();

		// Creates/setup the database and collection for mongodb
		var databaseURL = "scraper";
		var collections = ["scarpedData"];

		// Stores the mongojs configuration to the variable "db"
		var db = mongojs(databaseURL, collections);

		// Serve static content for the app from the "public" directory in the application directory.
		app.use(express.static("views"));


// Database Setup

		// Console logs an error if an error is encountered in the database
		db.on("error", function(error) {
			console.log("Database Error: ", error);
		});


// Body Parser Setup

		// sets the bodyparsers parameters
		app.use(bodyParser.urlencoded({ extended: false }));


// Handlebars Set up

		// // Sets a default file for handlebars to render
		// app.engine("handlebars", handlebars({ defaultLayout: "main" }));
		
		// // sets express view engine to handlebars
		// app.set("view engine", "handlebars");

// Routes

		// Import routes and give the server access to them.
		// var router = require('./controllers/burgers_controller.js');
		// app.use("/", router);
		app.get("/", function(req, res) {
			res.sendFile("./views/layout/main.handlebars");
		})


// Listens on port 3000
app.listen(3000, function() {
	console.log("App running on port 3000");
})