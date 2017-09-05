console.log("test");

function displayResults(data) {
  // Add to the table here...
  console.log(data);

  for(var i = 0; i < data.length; i ++ ) {

    // console.log(data[i].name);
    var tdName = "<td>" + data[i].name + "</td>"
    var tdnumleg = "<td>" + data[i].numlegs + "</td>"
    var tdClass = "<td>" + data[i].class + "</td>"
    var tdWeight = "<td>" + data[i].weight + "</td>"
    var tdCalled = "<td>" + data[i].whatIWouldReallyCallIt + "</td>"

    $("#data").append("<tr>" + tdName + tdnumleg + tdClass + tdWeight + tdCalled +"</tr>");

  };
};

$.getJSON("/all", function(data) {
  // Call our function to generate a table body
  displayResults(data);
});