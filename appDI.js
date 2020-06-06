
 // automatically resizes the chart
function makeResponsive() {

  // if the SVG area isn't empty when the browser loads,
  // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }

  // SVG wrapper dimensions are determined by the current width and
  // height of the browser window.
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  var margin = {
    top: 50,
    bottom: 50,
    right: 50,
    left: 50
  };

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;


 
// Import Global Death Data

 d3.csv("./data/global_deaths.csv").then(function(data) {

  console.log(data);  
  console.log(Object.values(data[0]));


// List of groups (here I have one group per column)
//  var ALLcountries = data.[CountryRegion]
//     console.log(ALLcountries)


          var i = 0;
          var afgan = (Object.values(data[0]));

    var dateparser = d3.timeParse("%d %b, %Y");
    var datevalues = [];
    var deathvalues = [];

    medalData.forEach(function(data) {
        data.date = dateParser(data.date);
        data.medals = +data.medals;
      });
  
  

    // for (var x in afgan){
    //    if (i >= 4){
    //        return dateparser(x)
    //   console.log(`${x}: ${afgan[x]}`);

    //   datevalues.push(x);
    //   deathvalues.push(afgan[x]);

    //    }
    //   i++;
      
    // }

    console.log(datevalues);
    console.log(deathvalues);

    var trace1 = {
      x : datevalues,
      y : deathvalues,
      name: "Afganistan",
      mode: 'line'
    };

    var linedata = [trace1];
    var layout = {
      title : "Afganistan Deatths Over 5 Months"
    };


      
  Plotly.newPlot('plot', linedata, layout);
    

// // ////New Plot



 });