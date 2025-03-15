const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=-7.8014&longitude=110.3647&daily=weather_code,apparent_temperature_min,apparent_temperature_max&current=temperature_2m,is_day,apparent_temperature,weather_code,wind_speed_10m,surface_pressure,wind_direction_10m,relative_humidity_2m&timezone=auto";

const days = document.querySelector("#days");
const currentWeather = document.getElementById("current-weather");
const hariNow = document.getElementById("hari-now")
const jam = document.getElementById("jam")
const suhuNow = document.getElementById("suhu-now")

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
    minute: "2-digit" 
  };
  const newFormat = new Date(date);
  return newFormat.toLocaleTimeString("id-ID", options);
};

const fetchWeather = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();

    hariNow.innerText = formattedDate(data.current.time);
    jam.innerText = formattedHours(data.current.time);
    suhuNow.innerText = data.current.apparent_temperature + ' °C';

    days.innerHTML = "";

    for (let i = 1; i < data.daily.weather_code.length; i++){
      days.innerHTML += `
        <div class="col-2">
          <div class="card text-center mb-3" style="min-height: 300px;">
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title">Sab, 12 Mar 2025</h5>
              <img src="https://weather-sense.leftium.com/icons/airy/clear@4x.png" alt="" width="80" style="margin: 0 auto;">
              <span class="card-text">rain</span>
              <div class="d-flex justify-content-between" style="">
                <span id="min-suhu">12°C</span>
                <span id="max-suhu">${data.daily.apparent_temperature_max[i]} °C</span>
              </div>
            </div>
          </div>
        </div>
            `;
    };
  } catch (err) {
    console.error(err);
  }
};

fetchWeather();
