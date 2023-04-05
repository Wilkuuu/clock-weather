let counter = 0

function getWeather() {
    $.get("/weather", function(data) {
        console.warn(data)
        // $("#weather").text(`${data.current_weather.temperature}${data.hourly_units.temperature_2m}`);
        // document.getElementById('weatherIcon').classList.add(addClass(data))

        $("#weather").text(`${data.currentConditions.temp}°C`);
        $("#humidity").text(`${data.currentConditions.humidity}%`);
        document.getElementById('weatherIcon').classList.value = '';
        document.getElementById('weatherIcon').classList.add(addClass(data))
    });
}
setInterval(getWeather, 30000);

function addClass(data){
    return data.currentConditions.icon
}


/*
 "current_weather": {
    "time": "2022-01-01T15:00"
    "temperature": 2.4, "weathercode": 3,
    "windspeed": 11.9, "winddirection": 95.0,
  },
  "hourly": {
    "time": ["2022-07-01T00:00","2022-07-01T01:00", ...]
    "windspeed_10m": [3.16,3.02,3.3,3.14,3.2,2.95, ...],
    "temperature_2m": [13.7,13.3,12.8,12.3,11.8, ...],
    "relativehumidity_2m": [82,83,86,85,88,88,84,76, ...],
  }
  */
