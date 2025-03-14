const daerah = document.getElementById('daerah')
const search = document.getElementById('search')
const update = document.getElementById('cari')

const URL = 'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&daily=weather_code,temperature_2m_min,temperature_2m_max&current=temperature_2m,is_day,weather_code'

const days = document.querySelector('#days');

const formattedDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  
    const newFormat = new Date(date);
    return newFormat.toLocaleDateString('id-ID', options);
};

const fetchWeather = async () => {
    try {
      const response = await fetch(URL);
      const json = await response.json();
  
      days.innerHTML = '';
  
      json.daily.weather_code.forEach((value, idx) => {
        days.innerHTML += `
            <div class="card text-bg-light mb-3">
              <div class="card-body">
                <h5 class="card-title">${
                  json.daily.temperature_2m_max[idx]
                }&#8451; <img src="" width="50"/></h5>
                <p class="card-text">${formattedDate(json.daily.time[idx])}</p>
              </div>
            </div>
        `;
      });
    } catch (err) {
      console.error(err);
    }
  };
  
  fetchWeather();

function updateText() {
    const inputText = search.value;
    daerah.textContent = inputText;
}

update.addEventListener('click', updateText);

search.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        updateText();
    }
});