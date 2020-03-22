
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

moment();

var oldNames = [];

if (localStorage.key("CityNames") === null){

}

else {
  var getData = JSON.parse(localStorage.getItem("CityNames"));
  oldNames = getData
  oldCityHistory()
}

$("#city-search-button").on("click", function(){

  var APIKey = "61884189ea401251c54c2d436ff4118c";
  var location = $("#location-name").val().trim();

  oldNames.push(location);
  localStorage.setItem("CityNames", JSON.stringify(oldNames));

  newCityHistory();
  recallHistory();
  
  var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?" + "q=" + location + "&appid=" +  APIKey;
  
  $.ajax({url: fiveDay, method: "GET"})

  .then(function(response) {

    // Current day & Five Day
    currentAndFiveDay(response);

    var lon = response.city.coord.lon
    var lat = response.city.coord.lat
    var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat +"&lon=" + lon;

      $.ajax({ url: uvIndexURL, method: "GET"})

      .then(function(result){        

        uvIndexF(result)

      });

  });

});

// Will listen for static elements


function newCityHistory(){

  var listCity = $("<button>");
  listCity.attr("class", "list-group-item list-group-item-action history");
  listCity.attr("data-name", $("#location-name").val().trim());
  listCity.text($("#location-name").val());
  $("#city-history").prepend(listCity);
  
};

function currentAndFiveDay (response){

  var cityName = (response.city.name);
  var currentDate = moment().calendar("MM, DD, YYYY");
  var currentTemp = ((response.list[0].main.temp - 273.15) * 1.8 + 32);
  var currentHumid = response.list[0].main.humidity;
  var currentWind = response.list[0].wind.speed;
  $("#current-name").text(cityName + " (" + currentDate + ")");
  $("#current-temp").html("Tempature: " + currentTemp.toFixed(1) + " &deg;F");
  $("#current-humid").text("Humidity: " + currentHumid + "%")
  $("#current-wind").text("Wind Speed: " + currentWind + " MPH")
  // 1-8 Day 1
  var dayDate1 = moment().add(1, 'day').calendar("MM, DD, YYYY");
  var day1Temp = ((response.list[5].main.temp - 273.15) * 1.8 + 32);
  var day1Humid = response.list[5].main.humidity;
  $("#day-one").text(dayDate1)
  $("#day-one-temp").html("Temp: " + day1Temp.toFixed(1) + " &deg;F")
  $("#day-one-humid").text("Humidity: " + day1Humid + "%")
  // 9-16 Day 2
  
  var dayDate2 = moment().add(2, 'day').calendar("MM, DD, YYYY");
  var day2Temp = ((response.list[13].main.temp - 273.15) * 1.8 + 32);
  var day2Humid = response.list[13].main.humidity;
  $("#day-two").text(dayDate2)
  $("#day-two-temp").html("Temp: " + day2Temp.toFixed(1) + " &deg;F")
  $("#day-two-humid").text("Humidity: " + day2Humid + "%")
  // 17-24 Day 3
  
  var dayDate3 = moment().add(3, 'day').calendar("MM, DD, YYYY");
  var day3Temp = ((response.list[21].main.temp - 273.15) * 1.8 + 32);
  var day3Humid = response.list[21].main.humidity;
  $("#day-three").text(dayDate3)
  $("#day-three-temp").html("Temp: " + day3Temp.toFixed(1) + " &deg;F")
  $("#day-three-humid").text("Humidity: " + day3Humid + "%")
  // 25-32 Day 4
  
  var dayDate4 = moment().add(4, 'day').calendar("MM, DD, YYYY");
  var day4Temp = ((response.list[29].main.temp - 273.15) * 1.8 + 32);
  var day4Humid = response.list[29].main.humidity;
  $("#day-four").text(dayDate4)
  $("#day-four-temp").html("Temp: " + day4Temp.toFixed(1) + " &deg;F")
  $("#day-four-humid").text("Humidity: " + day4Humid + "%")
  // 33-39 Day 5
  
  var dayDate5 = moment().add(5, 'day').calendar("MM, DD, YYYY");
  var day5Temp = ((response.list[37].main.temp - 273.15) * 1.8 + 32);
  var day5Humid = response.list[37].main.humidity;
  $("#day-five").text(dayDate5)
  $("#day-five-temp").html("Temp: " + day5Temp.toFixed(1) + " &deg;F")
  $("#day-five-humid").text("Humidity: " + day5Humid + "%")
}

function uvIndexF(result){
  
  var uvIndex = result.value;

  if(uvIndex === 1 || uvIndex === 2){

    $("#current-uv").html("UV Index: " + uvIndex);

  }
  else if (uvIndex === 3 || uvIndex < 5){

    $("#current-uv").html("UV Index: " + uvIndex);

  }
  else if (uvIndex === 6 || uvIndex === 7){

    $("#current-uv").html("UV Index: " + uvIndex);

  }
  else if (uvIndex === 8 || uvIndex < 10){

    $("#current-uv").html("UV Index: " + uvIndex);
    
  }
  else {

    $("#current-uv").html("UV Index: " + uvIndex);

  };

};

function recallHistory (){

  $(".history").on("click", function(){
        
    var dataName = $(this).attr("data-name").trim();
    
    var APIKey = "61884189ea401251c54c2d436ff4118c";
    console.log(dataName);
    
    var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?" + "q=" + dataName + "&appid=" +  APIKey;
    
    console.log(fiveDay);
    
    $.ajax({url: fiveDay, method: "GET"})
    
    .then(function(response) {

      currentAndFiveDay(response);
      var lon = response.city.coord.lon
      var lat = response.city.coord.lat
      var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat +"&lon=" + lon;

      $.ajax({ url: uvIndexURL, method: "GET"})

      .then(function(result){        

        uvIndexF(result)
      
      });
    
    });

  });
  
};

function oldCityHistory(){

  for (var i = 0; i < oldNames.length; i++){

    var listCity = $("<button>");
    listCity.attr("class", "list-group-item list-group-item-action history");
    listCity.attr("data-name", oldNames[i]);
    listCity.text(oldNames[i]);
    $("#city-history").prepend(listCity);

  }

};

recallHistory();