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

		// Sets a default file for handlebars to render
		app.engine("handlebars", handlebars({defaultLayout: "main"}));
		
		// sets express view engine to handlebars
		app.set("view engine", "handlebars");

// Routes

		// Import routes and give the server access to them.
		// var router = require('./controllers/burgers_controller.js');
		// app.use("/", router);
		app.get("/", function(req, res) {
			res.render(__dirname + "/views/layouts/main.handlebars");
		})

		// ** BEGINNING OF SCRAPE ROUTES **

			app.get("/scrape", function(req, res) {
				request("https://www.nytimes.com/", function(error, response, html) {
					var $ = cheerio.load(html);
					var results = [];

					// Iterate through each returned object and stores the title text and links
					$("h2.story-heading").each(function(i, element) {
						var link = $(element).children().attr("href");
						var title = $(element).children().text();

						// Because I was getting empty strings as titles and undefined links
						if(title != "" && typeof link != "undefined") {

							// Push variables to the array
							results.push({
								title: title,
								link: link
							});
						}
					});

					// Stores the array in the database
					// db.srapedData.insert({ results }, function(err, data) {
					// 	if(err) {
					// 		console.log(err);
					// 	} else {
					// 		res.json(data);
					// 	}
					// })
				});
			})



// Listens on port 3000
app.listen(3000, function() {
	console.log("App running on port 3000");
})