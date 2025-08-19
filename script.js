"use strict";

// weather app API key
const apiKey = "8a44457c35ed356cab20b1112a735311";

// When the button is clicked
document.getElementById("checkBtn").addEventListener("click", function () {
  let city = document.getElementById("locationField").value.trim();
  let weatherBox = document.getElementById("weatherDisplay");

  // Clear old messages
  weatherBox.textContent = "";
  weatherBox.className = "";

  if (city === "") {
    weatherBox.textContent = "Please type a city!";
    weatherBox.className = "error-msg";
    return;
  }

  weatherBox.textContent = "Fetching weather...";

  //API URL
  let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city;
  url = url + "&appid=" + apiKey + "&units=metric";

  console.log("Fetching from:", url); // beginner debugging

  fetch(url)
    .then(function (response) {
      if (response.ok) {
        return response.json(); // parse JSON
      } else {
        throw new Error("There's no city as such. Durh!!!");
      }
    })
    .then(function (data) {
      console.log(data); // see the data
      if (data.main) {
        weatherBox.textContent =
          city + " temperature: " + data.main.temp + "°C";
        weatherBox.className = "success-msg";
      } else {
        weatherBox.textContent = "Couldn't find temperature :/";
        weatherBox.className = "error-msg";
      }
    })
    .catch(function (err) {
      console.log("Error:", err);
      weatherBox.textContent = "Error: " + err.message;
      weatherBox.className = "error-msg";
    });
});
