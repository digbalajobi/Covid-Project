 // Import Global Death Data

 d3.csv("./data/global_deaths.csv").then(function(data) {

  console.log(data);  
  console.log(Object.values(data[0]));
   
    var i = 0;
    var afgan = Object.values(data[0]);
    var date = Object.keys(data[0]);

    datevalues = [];
    deathvalues = []

    for (var x in afgan){
       if (i >= 4){
      console.log(`${x}: ${afgan[x]} ${date[x]}`);

      datevalues.push(date[x]);
      deathvalues.push(afgan[x]);

       }
      i++;
      
    }

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
      title : "Afganistan Deaths Over 5 Months"
    };


      
  Plotly.newPlot('plot', linedata, layout);
    

// ////New Plot



 });