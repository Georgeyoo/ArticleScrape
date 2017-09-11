

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
      $("#hideDiv").hide();

})

// Function for grabbing the scrapped data and formatting the data in a presentable way to the front

function query() {

    // Fetch the returned data from /api/scrape 
    queryURL = "/api/scrape";
    $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
      for (var i =0; i <20; i++){
              
        // Declare variables for later use
        var well = $("<div>");
        var form = $("<form>");
        var panel = $("<div>");
        var heading = $("<div>")
        var headingText = $("<h2>");
        var button = $("<button>");
        var articleArea = $("<input>");

          well.addClass("well well-md");
          panel.addClass("panel panel-primary");
          heading.addClass("panel-heading");
          headingText.addClass("panel-title");
          form.attr({
            action:"/saved", 
            method: "POST",
            name: "article"
          });

          articleArea.attr({
            type:"hidden",
            name: "title",
            value:response[i].title
          });

          button.addClass("btn btn-lg btn-success pull-right")
          button.attr("type", "submit");
          button.html("Save Article");
          headingText.html(response[i].title);
          heading.append(headingText);
          heading.append(button);
          form.append(articleArea);
          form.append(button);
          panel.append(form);
          panel.append(heading);
          well.append(panel);

          $("#articleSection").append(well);
          }
    })
};