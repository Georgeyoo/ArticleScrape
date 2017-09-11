
$(".scrapeBtn").on("click", function(event) {
    event.preventDefault();
    query();
    $("#hideDiv").hide();

});

$("#showSaved").on("click", function(event) {
    event.preventDefault();
    savedOnes();
    $("#hideDiv").hide();
    $("#articleSection").hide();
});

$("#homeBtn").on("click", function(event) {
    event.preventDefault();
    $("#hideDiv").hide();
    $("#articleSection").show();
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

var articleId;
$(document).on('click', '#articleArea', function(){
    articleId = $(this).attr('data-id');//article id for each saved article for note
    console.log(articleId);
  });

function savedOnes() {
    
}