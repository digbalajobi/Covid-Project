  d3.csv("/data/time_series_covid19_confirmed_global.csv").then(function(data) {
 
   console.log(data);  
   console.log(Object.values(data[0]));
    
     var i = 0;
     var afgan = Object.values(data[0]);
     var date = Object.keys(data[0]);
 
     datevalues = [];
     casevalues = []
 
     for (var x in afgan){
        if (i >= 4){
       console.log(`${x}: ${afgan[x]} ${date[x]}`);
 
       datevalues.push(date[x]);
       casevalues.push(afgan[x]);
 
        }
       i++;
       
     }
 
     console.log(datevalues);
     console.log(casevalues);
 
     var trace1 = {
       x : datevalues,
       y : casevalues,
       name: "Afganistan",
       mode: 'markers',
       marker: {
         size: [10]
       }
     };
 
     var chartdata = [trace1];
     var layout = {
       title : "Afganistan Deaths Over 5 Months"
     };
 
 
       
   Plotly.newPlot('plot', chartdata, layout);
     
 
 // ////New Plot
 
 
 
  });