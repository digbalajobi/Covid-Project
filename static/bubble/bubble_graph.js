d3.csv("/get_confirmed_global").then(function (data) {
    var countrySumArray = [];
    var countryArray = [];
    var casesObj = {};
    for (var j = 0; j < data.length; j++) {
        var country = data[j]
        countryArray.push(country['CountryRegion'])
        countrySumArray.push(country["5/31/20"])
    }
    countryArray.forEach((key, i) => casesObj[key] = countrySumArray[i]);
    console.log(casesObj)
    var topCountries = [];
    var topValues = []

    function filterCountries(obj) {
        Object.entries(obj).forEach(([key, value]) => {
            if (value > 50000) {
                topCountries.push(key);
                topValues.push(value)
            }
        })
    }
    filterCountries(casesObj)
    console.log(topCountries)
    console.log(topValues)
    var bubbleSize = topValues.map(i => {
        return i / 500
    })
    var trace1 = {
        x: topCountries,
        y: topValues,
        name: "Countries",
        mode: 'markers',
        marker: {
            size: bubbleSize,
            sizemode: "area",
            color: topValues,
            colorscale: [
                [0, 'lightgreen'],
                [.5, 'darkblue'],
                [1, "orange"]
            ],
            cmin: 0,
            cmax: 1800000,
            color: topValues,
            colorbar: {
                thickness: 10,
                y: 0.5,
                ypad: 0,
                title: 'Confirmed Cases',
                titleside: 'bottom',
                outlinewidth: 1,
                outlinecolor: 'black',
                tickfont: {
                    family: 'Lato',
                    size: 14,
                    color: 'green'
                }
            }
        }

    };
    var chartdata = [trace1];
    var layout = {
        title: "Countries with over 100,000 Covid-19 Cases"
    };
    Plotly.newPlot('plot', chartdata, layout);
});