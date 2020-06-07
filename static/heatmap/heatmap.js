function drawPlot(path, currentDate) {
    var heatArray = [];
    d3.select("canvas").remove();
  d3.csv(path).then(function(d){
    console.log(d[0][currentDate])
    for (var i = 0; i < d.length; i++) {
      if (d[i].Long_){
        heatArray.push([
          parseFloat(d[i].Lat),
          parseFloat(d[i].Long_),
          parseInt(d[i][currentDate])]
          )
      }
      else {
        heatArray.push([
          parseFloat(d[i].Lat),
          parseFloat(d[i].Long),
          parseInt(d[i][currentDate])]
          )
        }
      }
    //  console.log(heatArray) 
     L.heatLayer(heatArray, {radius: 15, blur: 15})
     .addTo(myMap)
    }
  )
  }
   function changeDate (d){
     currentDate = d
     console.log(currentDate)
     console.log(dataSet)
     drawPlot(dataSet, currentDate)
     
   }
  
    var streetmap=L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: 'mapbox/streets-v11',
      accessToken: mbKey
      });
  
    var myMap = L.map("map", {
      center: [39, -95],
      zoom: 4,
      layers: [streetmap]
    });
  
  var dataSets = {
    "confirmed" : "/get_confirmed_us",
    "deaths" : "deaths_us.csv",
    "global_confirmed" : "confirmed_global.csv",
    "deaths_global" : "deaths_global.csv"
    }
  
  
  function optionChanged (d){
    var dataSets = {
      "confirmed" : "/get_confirmed_us",
      "deaths" : "deaths_us.csv",
      "global_confirmed" : "confirmed_global.csv",
      "deaths_global" : "deaths_global.csv"
      }
    console.log(`option changed to ${d}`)
    drawPlot(dataSets[d], currentDate)
  }
  
  function init (dataSet, currentDate){
    drawPlot(dataSet, currentDate);
    getDateArray(dataSet)
    
    d3.selectAll("td").remove();
    d3.selectAll("option").remove();
    var dropMenu = d3.select("#selDataset")
    var newOption = dropMenu.append("option")
    newOption.text("confirmed")
    var newOption = dropMenu.append("option")
    newOption.text("deaths")
    var newOption = dropMenu.append("option")
    newOption.text("global_confirmed")  
    var newOption = dropMenu.append("option")
    newOption.text("deaths_global")  
  
  
        // })
  }
  
  var dataSet = "/get_confirmed_us"
  var minDate = "1/22/20";
  var maxDate = "5/21/20";
  var sliderStartX= 100;
  var currentDate = minDate;
  var currentValue = 0;
  var dateArray=[]
  var epochArray = []
  var chartWidth = 720
  var svg = d3.select("#slider")
    .append("svg")
    .attr("width", chartWidth)
  
  
  function getDateArray(dataSet){
    
    d3.csv(dataSet).then(function(data) { 
    
    Object.entries(data[0]).forEach(([key,value])=>{
      const CODE_PATTERN = /^([0-9]{1,2}.[0-9]{1,2}.[0-9]{2})$/;
      const validateCode = function(key) {
        return CODE_PATTERN.test(key);
          };
      const isValidCode = validateCode(key);
        if(isValidCode===true){
          dateArray.push(key)
          epochArray.push(Date.parse(key))
          };
        })           
        var dropMenu = d3.select("#selDate")
        dateArray.forEach(function(date){
        var newOption = dropMenu.append("option")
        newOption.text(date)



        })
        
    
      

      })
  
    
  } ;
  

  init(dataSet, currentDate).then(function(){

    
  });

