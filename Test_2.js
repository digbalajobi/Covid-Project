function optionChanged (d) {
  console.log("option changed function");
  const isNumber = (element) => element === d;
  var idx = (countryArray.findIndex(isNumber));
  d3.selectAll("td").remove();
  d3.selectAll("option").remove();
  var dropMenu = d3.select("#selCountry")
    dropMenu.append("option").text(d);  
  init(idx);
console.log(idx)
}

function init (idx) {
  d3.csv("/data/time_series_covid19_confirmed_global.csv").then(function(data) {
    countryArray = [];
    data.forEach(function(j){
      Object.entries(j).forEach(([key, value])=>{
      if(key==='Country/Region')
      countryArray.push(value)
    })})
     
      var dropMenu = d3.select("#selCountry")
      countryArray.forEach(function(country){
      var newOption = dropMenu.append("option")
      newOption.text(country)})

    datevalues= [];
    casevalues= [];
    var country = Object.values(data[idx]);
    var date = Object.keys(data[idx]);
    for (var i = 4; i < data.length; i++){
 
    datevalues.push(date[i]);
    casevalues.push(country[i]);

     }
    console.log(datevalues);
    console.log(casevalues);
      var trace1 = {
      
       x : datevalues,
       y : casevalues,
       name: "Countries",
       mode: 'markers'
      //  marker: {
      //    size: [10]
      //  }
     };
 
     var chartdata = [trace1];
     var layout = {
       title : "Covid-19 Cases In Each Country"
     };
 
 
       
   Plotly.newPlot('plot', chartdata, layout);
})};
init(5)
  // d3.csv("/data/time_series_covid19_confirmed_global.csv").then(function(data) {
    
//     countryArray = [];
//     data.forEach(function(j){
//       Object.entries(j).forEach(([key, value])=>{
//       if(key==='Country/Region')
//       countryArray.push(value)
//     })})
//     console.log(countryArray)
    
//     var dropMenu = d3.select("#selCountry")
//       countryArray.forEach(function(country){
//       var newOption = dropMenu.append("option")
//       newOption.text(country)})
//     ;
   
//      var i = 0;
//      var afgan = Object.values(data[0]);
//      var date = Object.keys(data[0]);
//       console.log(afgan);
//       console.log(date);
//      datevalues = [];
//      casevalues = [];
 
//      for (var i = 4; i < afgan.length; i++){
 
//        datevalues.push(date[i]);
//        casevalues.push(afgan[i]);
 
//         }
//        console.log(datevalues);
//        console.log(casevalues);
       
     

 
//      var trace1 = {
      
//        x : datevalues,
//        y : casevalues,
//        name: "Afganistan",
//        mode: 'markers'
//       //  marker: {
//       //    size: [10]
//       //  }
//      };
 
//      var chartdata = [trace1];
//      var layout = {
//        title : "Afganistan Cases Over 5 Months"
//      };
 
 
       
//    Plotly.newPlot('plot', chartdata, layout);
     
 
//  // ////New Plot
//     });