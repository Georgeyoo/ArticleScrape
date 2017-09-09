//Dependencies

		// Creates the server and routing possible
		var express = require("express");
		var router = express.Router();
		var path = require("path");

		// sets up handlebars and stores it in variable "handlebars"
		var handlebars = require("express-handlebars");

		// Request + Cheerio to web scraping!
		var request = require("request");
		var cheerio = require("cheerio");
		var bodyParser = require("body-parser");


// Routes


	// Beginning route (when user visits home)
	router.get("/", function(req, res) {
		res.render("index");
	});

	// Route for when user saves an article
	router.get("/save", function(req, res) {
		res.send("Saved Article")
	})

		// ** BEGINNING OF SCRAPE ROUTE **

		router.get("/api/scrape", function(req, res) {
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
				res.json(results);
	
			});
		})

module.exports = router;