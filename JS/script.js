//links both API's and calls them simultaneously 
links = ['https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=15&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=','https://api.openweathermap.org/data/2.5/weather?q=']
data = [];

$('#get-data').click(function() {
    async.each(links, function(link,callback){
        $.getJSON(link, function(res){
            data.push(res);
            callback();
        })
    }, function(err){
        if(!err){
       
// initialize sidenav using materialize js
$(document).ready(function () {
  $(".sidenav").sidenav();
});

// initialize slider using materialize js
const slider = document.querySelector(".slider");
M.Slider.init(slider, {
  indicators: false,
  height: 500,
});

//  VARIABLES:
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var city = "";
var currentDate = "";
var tempF = "";
var humidityValue = "";
var windSpeed = "";
var uvIndexValue = "";
var latitude = "";
var longitude = "";
var minTempK = "";
var maxTempK = "";
var minTempF = "";
var maxTempF = "";
var dayhumidity = "";
var currentWeatherIconCode = "";
var currentWeatherIconUrl = "";
var iconcode = "";
var iconurl = "";
var country = "";
var listOfSearchedCities = [];

// SET LOCAL STORAGE:
var getSeachedCitiesFromLS = JSON.parse(
  localStorage.getItem("searched-cities")
);
if (getSeachedCitiesFromLS !== null) {
  getSeachedCitiesFromLS.forEach(function (city) {
    city.toUpperCase();
  });
  listOfSearchedCities = getSeachedCitiesFromLS;
}

$(document).ready(function () {
  displayCities(listOfSearchedCities);
  if (getSeachedCitiesFromLS !== null) {
    var lastCity = listOfSearchedCities[0];
    searchCity(lastCity);
  }
});

// SEARCH BUTTON FXN
$("#search-btn").on("click", function () {
  event.preventDefault();
  clearDisplayedWeatherInfo();
  resetGlobalVariables();

  var cityName = $("input").val().toUpperCase().trim();
  $("#search-input").val("");
  searchCity(cityName);

  if (cityName !== "" && listOfSearchedCities[0] !== cityName) {
    listOfSearchedCities.unshift(cityName);
    localStorage.setItem(
      "searched-cities",
      JSON.stringify(listOfSearchedCities)
    );

    if (listOfSearchedCities.length === 1) {
      $("#searched-cities-card").removeClass("hide");
    }

    console.log($("ul#searched-cities-list a").length);

    if ($("ul#searched-cities-list a").length >= 5) {
      $("ul#searched-cities-list a:eq(4)").remove();
    }

    $("#searched-cities-list")
      .prepend(`<a href="#" class="list-group-item" style="text-decoration: none; color: black;">
    <li>${cityName}</li>
    </a>`);
  }
});

$(document).on("click", ".list-group-item", function () {
  var cityName = $(this).text();
  clearDisplayedWeatherInfo();
  resetGlobalVariables();
  searchCity(cityName);
});
function displayCurrentWeather() {
  var cardDiv = $("<div class='container border bg-light'>");
  var weatherImage = $("<img>").attr("src", currentWeatherIconUrl);
  var cardHeader = $("<h4>").text(city + " " + currentDate.toString());
  cardHeader.append(weatherImage);
  var temperatureEl = $("<p>").text("Temperature: " + tempF + " ºF");
  var humidityEl = $("<p>").text("Humidity: " + humidityValue + "%");
  var windSpeedEl = $("<p>").text("Wind Speed: " + windSpeed + " MPH");
  var uvIndexEl = $("<p>").text("UV Index: ");
  var uvIndexValueEl = $("<span>")
    .text(uvIndexValue)
    .css("background-color", getColorCodeForUVIndex(uvIndexValue));
  uvIndexEl.append(uvIndexValueEl);
  cardDiv.append(cardHeader);
  cardDiv.append(temperatureEl);
  cardDiv.append(humidityEl);
  cardDiv.append(windSpeedEl);
  cardDiv.append(uvIndexEl);
  $("#current-weather-conditions").append(cardDiv);
}

function displayDayForeCast() {
  var imgEl = $("<img>").attr("src", iconurl);
  var cardEl = $("<div class='card'>").addClass(
    "pl-1 bg-light text-dark center"
  );
  var cardBlockDiv = $("<div>").attr("class", "card-block");
  var cardTitleDiv = $("<div>").attr("class", "card-block");
  var cardTitleHeader = $("<h6>")
    .text(dateValue)
    .addClass("pt-2")
    .css("font-size", "2rem");
  var cardTextDiv = $("<div>").attr("class", "card-text");
  var minTempEl = $("<p>")
    .text("Min Temp: " + minTempF + " ºF")
    .css("font-size", "1.25rem");
  var maxTempEl = $("<p>")
    .text("Max Temp: " + maxTempF + " ºF")
    .css("font-size", "1.25rem");
  var humidityEl = $("<p>")
    .text("Humidity: " + dayhumidity + "%")
    .css("font-size", "1.25rem");
  cardTextDiv.append(imgEl);
  cardTextDiv.append(minTempEl);
  cardTextDiv.append(maxTempEl);
  cardTextDiv.append(humidityEl);
  cardTitleDiv.append(cardTitleHeader);
  cardBlockDiv.append(cardTitleDiv);
  cardBlockDiv.append(cardTextDiv);
  cardEl.append(cardBlockDiv);
  $(".card-deck").append(cardEl);
}

function addCardDeckHeader() {
  deckHeader = $("<h4>").text("Weekly Forecast").attr("id", "card-deck-title");
  deckHeader.addClass("pt-4 pt-2");
  $(".card-deck").before(deckHeader);
}

function clearDisplayedWeatherInfo() {
  $("#current-weather-conditions").empty();
  $("#card-deck-title").remove();
  $(".card-deck").empty();
}
function displayCities(citiesList) {
  $("#searched-cities-card").removeClass("hide");
  var count = 0;
  citiesList.length > 5 ? (count = 5) : (count = citiesList.length);
  for (var i = 0; i < count; i++) {
    $("#searched-cities-list").css("list-style-type", "none");
    $("#searched-cities-list")
      .append(`<a href="#" class="list-group-item" style="text-decoration: none; color: black;">
    <li>${citiesList[i]}</li>
    </a>`);
  }
}
function getColorCodeForUVIndex(uvIndex) {
  var uvIndexValue = parseFloat(uvIndex);
  var colorcode = "";
  if (uvIndexValue <= 2) {
    colorcode = "#00FF00";
  } else if (uvIndexValue > 2 && uvIndexValue <= 5) {
    colorcode = "#FFFF00";
  } else if (uvIndexValue > 5 && uvIndexValue <= 7) {
    colorcode = "#FFA500";
  } else if (uvIndexValue > 7 && uvIndexValue <= 10) {
    colorcode = "#9E1A1A";
  } else if (uvIndexValue > 10) {
    colorcode = "#7F00FF";
  }
  return colorcode;
}
function resetGlobalVariables() {
  city = "";
  currentDate = "";
  tempF = "";
  humidityValue = "";
  windSpeed = "";
  uvIndexValue = "";
  latitude = "";
  longitude = "";
  minTempK = "";
  maxTempK = "";
  minTempF = "";
  maxTempF = "";
  dayhumidity = "";
  currentWeatherIconCode = "";
  currentWeatherIconUrl = "";
  iconcode = "";
  iconurl = "";
  country = "";
}
function searchCity(cityName) {
  // build URL to query the database
  console.log(cityName);
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var result = response;
    console.log(result);
    city = result.name.trim();
    currentDate = moment.unix(result.dt).format("l");
    console.log(currentDate);
    var tempK = result.main.temp;
    tempF = ((tempK - 273.15) * 1.8 + 32).toFixed(1);
    humidityValue = result.main.humidity;
    windSpeed = result.wind.speed;
    currentWeatherIconCode = result.weather[0].icon;
    currentWeatherIconUrl =
      "https://openweathermap.org/img/w/" + currentWeatherIconCode + ".png";
    var latitude = result.coord.lat;
    var longitude = result.coord.lon;
    var uvIndexQueryUrl =
      "https://api.openweathermap.org/data/2.5/uvi?&appid=" +
      APIKey +
      "&lat=" +
      latitude +
      "&lon=" +
      longitude;
    $.ajax({
      url: uvIndexQueryUrl,
      method: "GET",
    }).then(function (response) {
      uvIndexValue = response.value;
      displayCurrentWeather();
      var fiveDayQueryUrl =
        "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
        city +
        "&appid=" +
        APIKey +
        "&cnt=5";
      $.ajax({
        url: fiveDayQueryUrl,
        method: "GET",
      }).then(function (response) {
        var fiveDayForecast = response.list;
        addCardDeckHeader();
        for (var i = 0; i < 5; i++) {
          iconcode = fiveDayForecast[i].weather[0].icon;
          iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
          dateValue = moment.unix(fiveDayForecast[i].dt).format("l");
          minTempK = fiveDayForecast[i].temp.min;
          minTempF = ((minTempK - 273.15) * 1.8 + 32).toFixed(1);
          maxTempK = fiveDayForecast[i].temp.max;
          maxTempF = (
            (fiveDayForecast[i].temp.max - 273.15) * 1.8 +
            32
          ).toFixed(1);
          dayhumidity = fiveDayForecast[i].humidity;
          displayDayForeCast();
        }
      });
    });
  });
}

$("#search-btn").on("click", function () {
  var city = $("#search-input").val().toUpperCase().trim();
  callTripAdvisor(city);
});

function callTripAdvisor(city) {
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=15&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=" +
      city,
    method: "GET",
    headers: {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "5ac62cb935mshb3eac24b9617fe8p1003a4jsncbd2d3214566",
    },
  };

  $.ajax(settings).then(function (response) {
    console.log(response);
    displayTripAdivsor(response);
  });
}

function displayTripAdivsor(response) {
  for (i = 0; i < response.data.length; i++) {
    var cardDivBlock = $("<div>");
    var cardDiv = $("<div>");
    var cardImage = $("<div>");
    var cardBody = $("<div>");
    var cardTitle = $("<div>");
    var cardSubtitle = $("<div>");
    var cardText = $("<div>");
    var cardLink = $("<div>");

    $(cardDivBlock).addClass("col-4");
    $("#trip2").append(cardDivBlock);

    $(cardDiv).addClass("card");
    $(cardDivBlock).append(cardDiv);

    $(cardImage).addClass("card-image");
    $(cardImage).append(
      "<img src =" +
        response.data[i].result_object.photo.images.original.url +
        ">"
    );
    $(cardDiv).append(cardImage);

    $(cardBody).addClass("card-body");
    $(cardDiv).append(cardBody);

    $(cardTitle).addClass("card-title");
    $(cardTitle).text(response.data[i].result_object.name);
    $(cardBody).append(cardTitle);

    $(cardSubtitle).addClass("card-subtitle");
    $(cardSubtitle).text(response.data[i].result_type);
    $(cardBody).append(cardSubtitle);

    $(cardText).addClass("card-text");
    $(cardText).text(response.data[i].result_object.category.key);
    $(cardBody).append(cardText);

    $(cardLink).addClass("card-action");
    $(cardDiv).append(cardLink);
  }
}

Promise.all([
    fetch('https://jsonplaceholder.typicode.com/posts'),
    fetch('https://jsonplaceholder.typicode.com/users')
]).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
        return response.json();
    }));
}).then(function (data) {
    // Log the data to the console
    // You would do something with both sets of data here
    console.log(data);
}).catch(function (error) {
    // if there's an error, log it
    console.log(error);
});
    })
  
});