const days = document.querySelector("#days");
const currentWeather = document.getElementById("current-weather");
const hariNow = document.getElementById("hari-now");
const jam = document.getElementById("jam");
const suhuNow = document.getElementById("suhu-now");
const iconNow = document.getElementById("current-icon");
const windSpeed = document.getElementById("wind-speed");
const pressure = document.getElementById("pressure");
const windDir = document.getElementById("wind-direction");
const humidity = document.getElementById("humidity");


const cityName = document.getElementById("nama-kota");
const cari = document.getElementById("search-bar");

const formattedDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const newFormat = new Date(date);
  return newFormat.toLocaleDateString("id-ID", options);
};

const formattedShortDate = (date) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const newFormat = new Date(date);
  return newFormat.toLocaleDateString("id-ID", options);
};

const formattedHours = (date) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const newFormat = new Date(date);
  return newFormat.toLocaleTimeString("id-ID", options);
};

const getWeather = async (latitude, longitude) => {
  const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,apparent_temperature_min,apparent_temperature_max&current=temperature_2m,is_day,apparent_temperature,weather_code,wind_speed_10m,surface_pressure,wind_direction_10m,relative_humidity_2m&timezone=auto`;

  const response = await fetch(WEATHER_URL);
  const data = await response.json();

  hariNow.innerText = formattedDate(data.current.time);
  jam.innerText = formattedHours(data.current.time);
  suhuNow.innerText = data.current.apparent_temperature + " °C";
  windSpeed.innerText = data.current.wind_speed_10m + ' km/h';
  pressure.innerText = data.current.surface_pressure + ' hPa';
  windDir.innerText = data.current.wind_direction_10m + ' °';
  humidity.innerText = data.current.relative_humidity_2m + ' %';
  // desc.innerText = WHO[data.current.weather_code].day.image;

  iconNow.innerHTML = `<img src="${
    WMO[data.current.weather_code].day.image
  }"/>`;

  days.innerHTML = "";

  for (let i = 1; i < data.daily.weather_code.length; i++) {
    days.innerHTML += `
        <div class="col-2">
          <div class="card text-center mb-3 bg-black bg-opacity-50 text-white" style="min-height: 300px;">
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title">${formattedShortDate(
                data.daily.time[i]
              )}</h5>
              <img src="${
                WMO[data.daily.weather_code[i]].day.image
              }" alt="" width="80" style="margin: 0 auto;">
              <span class="card-text">${
                WMO[data.daily.weather_code[i]].day.description
              }</span>
              <div class="d-flex justify-content-between" style="">
                <span id="min-suhu">${
                  data.daily.apparent_temperature_min[i]
                } °C</span>
                <span id="max-suhu">${
                  data.daily.apparent_temperature_max[i]
                } °C</span>
              </div>
            </div>
          </div>
        </div>
      `;
  }
};

const getCoordinate = async () => {
  let name = cari.value;
  cityName.innerText = name;

  cari.value = '';
  
  const GEOCODING_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1&language=en&format=json`;

  const response = await fetch(GEOCODING_URL);
  const data = await response.json();

  let latitude = data.results[0].latitude;
  let longitude = data.results[0].longitude;

  getWeather(latitude, longitude);
};

const getLocation = () => {
  cityName.innerText = "Yogyakarta";

  navigator.geolocation.getCurrentPosition((position) => {
    getWeather(position.coords.latitude, position.coords.longitude);
  });
};

getLocation();
