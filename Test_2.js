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
           color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)', 'rgb(12,240,233)', 'rgb(218, 75, 75)', 'rgb(153, 51, 255)', 'rgb(153, 204, 255)', 'rgb(255, 255, 51)', 'rgb(192, 192, 192)', 'rgb(255, 0, 0)'],
         }
       };
       var chartdata = [trace1];
       var layout = {
         title : "Countries with over 100,000 Covid-19 Cases"
       };
       Plotly.newPlot('plot', chartdata, layout);
});