document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value +
    ",US&units=imperial" + "&APPID=209eedb6880977cc3d05f20385391a66";
  fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(json) {

    //Output results
    console.log(json);
    let results = "";
    results += '<h1 id="weatherHeader">Current Weather in ' + json.name + "</h1>";
    results += "<div id='mainWeather'>";
      for (let i=0; i < json.weather.length; i++) {
        results += '<img id="mainIcon" src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += "<p id='description'>"
      for (let i=0; i < json.weather.length; i++) {
        results += json.weather[i].description
        if (i !== json.weather.length - 1)
          results += ", "
      }
      results += "</p>";
      results += '<h2 id="temp">' + json.main.temp + " &deg;F</h2>"
    results += "</div>";
    results += '<h3>Feels Like: ' + json.main.feels_like + " &deg;F</h3>"
    results += '<h3>High: ' + json.main.temp_max + " &deg;F</h3>"
    results += '<h3>Low: ' + json.main.temp_min + " &deg;F</h3>"
    results += '<h3>Humidity: ' + json.main.humidity + "%</h3>"
    results += '<h3>Wind Speed: ' + json.wind.speed + " mph</h3>"

    document.getElementById("weatherResults").innerHTML = results;
    document.getElementById('currWeather').style.border= "2px solid #4B7180";
    //document.getElementById('currWeather').style.height= "550px";
  })
  .catch(error => {
    let results = "<h2>Error</h2>";
    results += "<p id='errorMessage'>City could not be found. Please check your spelling and try again</p>";
    document.getElementById("weatherResults").innerHTML = results;
  });

  // Forecast
  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value +
    ", US&units=imperial" + "&APPID=209eedb6880977cc3d05f20385391a66";
    fetch(url2)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        // Output Results
        console.log(json);
        let forecast = "<h1>5 Day Forecast</h1>";
        for (let i=0; i < json.list.length / 8; i++) {
          forecast += "<h2>" + moment(json.list[i * 8].dt_txt).format('MMMM Do, YYYY') + "</h2>";
          forecast += "<div class='day'>"
          for (let j=0; j < json.list.length / 5; j++) {
            forecast += "<div class='timeP'>";
            forecast += "<h3>" + moment(json.list[(i * 8) + j].dt_txt).format('h:mm a') + "</h3>";
            forecast += '<img class="foreIcon" src="http://openweathermap.org/img/w/' + json.list[(i * 8) + j].weather[0].icon + '.png"/>'
            forecast += "<h5>" + json.list[(i * 8) + j].weather[0].main + "</h5>";
            forecast += "<h4>" + json.list[(i * 8) + j].main.temp + " &deg;F</h4>";
            forecast += "<p>High: " + json.list[(i*8)+j].main.temp_max + "</p>";
            forecast += "<p>Low: " + json.list[(i*8)+j].main.temp_min + "</p>";
            forecast += "</div>";
          }
          forecast += "</div>";
        }
        document.getElementById("forecastResults").innerHTML = forecast;
        document.getElementById('forecast').style.border= "2px solid #4B7180";
  })
  .catch(error => {
    document.getElementById("forecastResults").innerHTML = "";
    document.getElementById('forecast').style.border= "0px";
  });
});
