let counter = 0

function getWeather() {
    $.get("/weather", function (data) {
        console.warn(data)
        // $("#weather").text(`${data.current_weather.temperature}${data.hourly_units.temperature_2m}`);
        // document.getElementById('weatherIcon').classList.add(addClass(data))

        $("#weather").text(`${data.currentConditions.temp}°C`);
        $("#humidity").text(`${data.currentConditions.humidity}%`);
        $("#wind").text(`${data.currentConditions.windspeed}km/h`);
        $("#pressure").text(`${data.currentConditions.pressure}hPa`);
        document.getElementById('weatherIcon').classList.value = '';
        // document.getElementById('weatherIcon').classList.add(addClass(data))
        document.getElementById('weatherIcon').innerHTML = ` <div class="row">
              <img class="weatherIcon" src="static/css/icons/${data.currentConditions.icon}.png"/>
            </div>`
        document.getElementById('day1').innerHTML = `<div>
            <div class="row">${data.days[0].feelslike}°C</div>
            <div class="row">
              <img class="dailyIcon" src="static/css/icons/${data.days[0].icon}.png"/>
            </div>
            </div>`
        document.getElementById('day2').innerHTML = `<div>
            <div class="row">${data.days[1].feelslike}°C</div>
            <div class="row">
                <img class="dailyIcon" src="static/css/icons/${data.days[1].icon}.png" />
            </div>
            </div>`
        document.getElementById('night').innerHTML = `
<div class="row"></div>
<div class="row">
    
</div>
<div class="row"></div>
`
    });
}

setInterval(getWeather, 3000);

function getIconSrc(data) {

}

function addClass(data) {
    return data.currentConditions.icon
}

function getMoonPhase(phase) {
    if (phase === 0) {
        return 'newMoon'
    }
    if (0 < phase < 0.25) {

    }
    if (0.25 === phase) {

    }
    if (0.25 < phase < 0.5) {

    }
    if (phase === 0.5) {

    }
    if (0.5 < phase < 0.75) {

    }
    if (phase === 0.75) {

    }
    if (0.75 < phase < 1) {

    }
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
//
// 0 – new moon
// 0-0.25 – waxing crescent
// 0.25 – first quarter
// 0.25-0.5 – waxing gibbous
// 0.5 – full moon
// 0.5-0.75 – waning gibbous
// 0.75 – last quarter
// 0.75 -1 – waning crescent
