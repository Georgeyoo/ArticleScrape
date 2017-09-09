

// function displayResults(data) {
//   // Add to the table here...
//   console.log(data);

//   for(var i = 0; i < data.length; i ++ ) {

//     // console.log(data[i].name);
//     var tdName = "<td>" + data[i].name + "</td>"
//     var tdnumleg = "<td>" + data[i].numlegs + "</td>"
//     var tdClass = "<td>" + data[i].class + "</td>"
//     var tdWeight = "<td>" + data[i].weight + "</td>"
//     var tdCalled = "<td>" + data[i].whatIWouldReallyCallIt + "</td>"

//     $("#data").append("<tr>" + tdName + tdnumleg + tdClass + tdWeight + tdCalled +"</tr>");

//   };
// };

$(".scrapeBtn").on("click", function(event) {

      event.preventDefault();
      query();
      //hides original panel-warning div 
      $("#noneDiv").hide();

})


// function scrapeQuery(){
//     //grab data from api/scrape   
//     queryURL = "/api/scrape";
//     $.ajax({ url: queryURL, method: "GET" })
//         // After data comes back from the request
//         .done(function(response) {
//           console.log(queryURL);
//           console.log(response);
//           for (var i =0; i <20; i++){
//               //loop through results and add panels for each response 
//               var well = $("<div>");
//               var form = $("<form>");
//               var panel = $("<div>");
//               var heading = $("<div>")
//               var headingText = $("<h3>");
//               var button = $("<button>");
//               var input1 = $("<input>");
//               var input2 = $("<input>");
//               well.addClass("well well-lg");
//               panel.addClass("panel panel-primary");
//               heading.addClass("panel-heading");
//               headingText.addClass("panel-title");
//               form.attr({
//                             action:"/saved", 
//                             method: "POST",
//                             name: "article"
//                         });
//               input1.attr({
//                 type:"hidden",
//                 name: "title",
//                 value:response[i].title
//               });
//               button.addClass("btn btn-sm btn-success pull-right")
//               button.attr("type", "submit");
//               button.html("Save Article");
//               headingText.html(response[i].title);
//               heading.append(headingText);
//               heading.append(button);
//               form.append(input1);
//               form.append(button);
//               panel.append(form);
//               panel.append(heading);
//               well.append(panel);
//               $("#panelSection").append(well);
//           }
//     })
// };

// Function for grabbing the scrapped data and formatting the data in a presentable way to the front
function query() {

    // Declare variables for later use
    var panel = $("<div>");
    var form = $("<form>");
    var heading = $("<div>");
    var articleTitle = $("<h2>");
    var articleLink = $("<a>");
    var saveBtn = $("<button>");
    var articleWhole = $("<input>");
    // var linkBtn = $("<button> View Story </button>");

  // Fetch the returned data from /api/scrape
  queryURL = "/api/scrape";

  $.ajax({url: queryURL, method: "GET"}).done(function(response) {
    for(var i = 0; i < 20; i ++) {
      form.attr({
        action: "/save",
        method: "POST",
        name: "article"
      });
      panel.addClass("panel panel-primary");
      saveBtn.addClass("btn btn-md pull-right");
      saveBtn.attr("type", "submit");
      saveBtn.html("Save Article");
      linkBtn.attr()
      articleTitle.html(response[i].title);
      articleLink.attr("href", response[i].link);
      heading.append(articleTitle);
      heading.append(articleLink);
      heading.append(saveBtn);
      form.append(articleWhole);
      form.append(saveBtn);
      panel.append(form);
      panel.append(heading);
      // panel.append(linkBtn);
      $("#articleSection").append(panel);

    }
  })
}