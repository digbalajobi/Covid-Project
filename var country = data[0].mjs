var country = data[0]
    var datevalues = [];
    var deathvalues = [];
    console.log(country)
    var i = 0
    for (var x in country) {
      // console.log(x)
      if (i >= 4) {
        console.log(`${x}: ${country[x]}`);
        datevalues.push(x);
        deathvalues.push(country[x]);
      }
      i++;
    }
    console.log(datevalues);
    console.log(deathvalues);