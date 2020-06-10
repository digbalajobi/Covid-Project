d3.csv("/data/time_series_covid19_confirmed_global.csv").then(function(data) {
  var countrySumArray = [];
  var countryArray = [];
  var casesObj = {};
  for (var j=0; j < data.length; j++) {
  var country = data[j]
  countryArray.push(country['Country/Region'])    
  countrySumArray.push(country["6/2/20"])  
}
countryArray.forEach((key,i) => casesObj[key] = countrySumArray[i]);
console.log(casesObj)
var topCountries = [];
var topValues =[]
  function filterCountries(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      if (value > 100000){
        topCountries.push(key);
        topValues.push(value)
      }
    })
  }
filterCountries(casesObj)
console.log(topCountries)
console.log(topValues)
var bubbleSize = topValues.map(i => {
  return i/500
})
var trace1 = {
         x: topCountries,
         y : topValues,
         name: "Countries",
         mode: 'markers',
         marker: {
           size: bubbleSize,
           sizemode: "area",
           color: topValues,
         }
       };
       var chartdata = [trace1];
       var layout = {
         title : "Countries with over 100,000 Covid-19 Cases"
       };
       Plotly.newPlot('plot', chartdata, layout);
});