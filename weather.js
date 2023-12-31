const api = "5062c226f0087f3b318b3efa4816361a";
let city = "Bangalore";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const icon = document.querySelector(".icon");


function search() {
  city = searchBox.value;
  getWeather();
}


searchBtn.addEventListener("click", search);


searchBox.addEventListener("keyup", function (event) {
  
  if (event.keyCode === 13) {
    search();
  }
});

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
  const response = await fetch(url);

  if (response.status === 404) {
    document.querySelector(".weather").innerHTML =
      "<h2 style ='color:white; margin:40px; font-size:30px; '> NO DATA FOUND PLEASE ENTER VALID CITY NAME AFTER REFRESHING THE PAGE. </h2>";
    return; 
  }

  const data = await response.json();
  console.log(data);

  document.querySelector(".city").innerText = data.name;
  document.querySelector(".temp").innerText = data.main.temp + "°C";
  document.querySelector(".humidity-percent").innerText =
    data.main.humidity + "%";
  document.querySelector(".speed").innerText = data.wind.speed + "Km/h";

  // Set the icon based on the weather condition
  if (data.weather[0].main == "Clouds") {
    icon.src = "images/cloudy.png";
  } else if (data.weather[0].main == "Clear") {
    icon.src = "images/sunny.png";
  } else if (data.weather[0].main == "Rain") {
    icon.src = "images/rainy.png";
  } else if (data.weather[0].main == "Snow") {
    icon.src = "images/snowy.png";
  } else if (
    data.weather[0].main == "Mist" ||
    data.weather[0].main == "Fog" ||
    data.weather[0].main == "Smoke"
  ) {
    icon.src = "images/foggy.png";
  } else {
    icon.src = "images/sunny.png";
  }
}

getWeather(); 
