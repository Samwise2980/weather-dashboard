
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast

// when the user clicks on the search button
  // get the value of the input field
  // assign it to a variable
  // input that value into the search url
  // 
moment().format();

$("#city-search-button").on("click", function(){

  var APIKey = "61884189ea401251c54c2d436ff4118c";
  var location = $("#location-name").val().trim();

  cityHistory();

  $(".history").on("click", function(){

    alert("I am here!");
    var dataName = $(this).attr("data-name").trim();
    var APIKey = "61884189ea401251c54c2d436ff4118c";
    console.log(dataName);
    
    var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?" + "q=" + dataName + "&appid=" +  APIKey;
    console.log(fiveDay);
    $.ajax({url: fiveDay, method: "GET"})
  
    .then(function(response) {
  
      console.log(response);
  
    });
  
  });
  
  var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?" + "q=" + location + "&appid=" +  APIKey;
  
  $.ajax({url: fiveDay, method: "GET"})

  .then(function(response) {

    // Date
    var month = moment().format("M")
    var day = moment().format("D")
    var year = moment().format("YYYY")
    console.log(response);

    // Current day
    var cityName = (response.city.name);
    var currentTemp = ((response.list[0].main.temp - 273.15) * 1.8 + 32);
    var currentHumid = response.list[0].main.humidity;
    var currentWind = response.list[0].wind.speed;

    $("#current-name").text(cityName + " (" +  month + "/" + day + "/" + year + ")");
    $("#current-temp").html("Tempature: " + currentTemp.toFixed(1) + " &deg;F");
    $("#current-humid").text("Humidity: " + currentHumid + "%")
    $("#current-wind").text("Wind Speed: " + currentWind + " MPH")

    // 1-8 Day 1
    var day1Temp = ((response.list[0].main.temp - 273.15) * 1.8 + 32);
    var day1Humid = response.list[0].main.humidity;
    var day1Wind = response.list[0].wind.speed;


    // 9-16 Day 2
    // 17-24 Day 3
    // 25-32 Day 4
    // 33-39 Day 5

    var lon = response.city.coord.lon
    var lat = response.city.coord.lat

    var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat +"&lon=" + lon;

      $.ajax({ url: uvIndexURL, method: "GET"})

      .then(function(result){

        console.log(result);

        var uvIndex = result.value;
        var uvColor = $("<button>").text(uvIndex);

        if(uvIndex === 1 || uvIndex === 2){

          $("#current-uv").text("UV Index: " + uvColor);

        }
        else if (uvIndex === 3 || uvIndex < 5){

          $("#current-uv").text("UV Index: " + uvColor);

        }
        else if (uvIndex === 6 || uvIndex === 7){

          $("#current-uv").text("UV Index: " + uvColor);

        }
        else if (uvIndex === 8 || uvIndex < 10){

          $("#current-uv").text("UV Index: " + uvColor);
          

        }
        else {



        };
        

      });


  });

});

// Will listen for static elements


function cityHistory(){

  var listCity = $("<button>");
  listCity.attr("class", "list-group-item list-group-item-action history");
  listCity.attr("data-name", $("#location-name").val().trim());
  listCity.text($("#location-name").val());
  $("#city-history").prepend(listCity);
  
};

