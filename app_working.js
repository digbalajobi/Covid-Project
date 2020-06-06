function findWithAttr(array, attr, value) {
  for(var i = 0; i < array.length; i += 1) {
      if(array[i][attr] === value) {
          return i;
      }
  }
  return -1;
}
 
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


console.log(this.findWithAttr(data,"CountryRegion","France"))

// add the options to the button
d3.select("#selectButton")
.selectAll('myOptions')
   .data(data)
.enter()
  .append('option')
.text(function (d) { return d.CountryRegion; }) // text showed in the menu
.attr("value", function (d) { return findWithAttr(data,"CountryRegion",d.CountryRegion) }) // corresponding value returned by the button


  console.log(data);  
  // When the button is changed, run the updateChart function
d3.select("#selectButton").on("change", function(d) {
  // recover the option that has been chosen
  var selectedOption = d3.select(this).property("value")
  // run the updateChart function with this selected option
  // update(selectedOption)
  console.log(selectedOption)
  
  var country = data[selectedOption]

    datevalues = [];
    deathvalues = [];

    console.log(country)

    var i = 0

    for (var x in country){
      // console.log(x)
       if (i >= 4){
      console.log(`${x}: ${country[x]}`);

      datevalues.push(x);
      deathvalues.push(country[x]);

       }
      i++;
      
    }


    console.log(datevalues);
    console.log(deathvalues);

    var trace1 = {
      x : datevalues,
      y : deathvalues,
      name: `${country[1]}`,
      mode: 'line'
    };

    var linedata = [trace1];
    var layout = {
      title : `${country.CountryRegion} Deaths Over 5 Months`
    };


      
  Plotly.newPlot('plot', linedata, layout);
})



 });

}

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);
