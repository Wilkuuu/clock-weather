let dailyData = null
let globalTimeout = null
function getWeather() {
    $.get("/weather", function (data) {
        dailyData = data
        console.warn(data)
        // $("#weather").text(`${data.current_weather.temperature}${data.hourly_units.temperature_2m}`);
        // document.getElementById('weatherIcon').classList.add(addClass(data))


        document.getElementById('weather').innerHTML = `<p>${Math.round(data.currentConditions.temp)}°C</p>`;
        document.getElementById('humidity').innerHTML = `<div class="col-1"><img class="detailIcon" src="static/css/icons/humi-icon.png" /></div><div class="col"><p>${data.currentConditions.humidity}%</p></div>`;
        document.getElementById('wind').innerHTML = `<div class="col-1"><img class="detailIcon" src="static/css/icons/wind-icon.png" /></div><div class="col"><p>${data.currentConditions.windspeed}km/h ${degToCompass(data.currentConditions.winddir)}</p></div>`;
        document.getElementById('pressure').innerHTML = `<div class="col-1"><img class="detailIcon" src="static/css/icons/dir-icon.png" /></div><div class="col"><p>${data.currentConditions.pressure}hPa</p></div>`;
        document.getElementById('weatherIcon').innerHTML = getCurrentWeather(data)
        document.getElementById('day1').innerHTML = getDayWeather(data, 1)
        document.getElementById('day2').innerHTML = getDayWeather(data, 2)
        document.getElementById('night').innerHTML = getNight(data)
    });
}

setInterval(getWeather, 100000);

function getDayWeather(data, index) {
    let day = new Date(new Date().setDate(new Date().getDate() + index)).getDate()
    let month = new Date(new Date().setDate(new Date().getDate() + index)).getMonth()
    month = month < 10 ? `0${month}` : month
    return `<div class="nextDayBorder" onclick="showDailyPerHours(${index})">
                <div class="col">
                     <div class="row"><p class=" nextDayHeader text-center">${setDay(new Date(new Date().setDate(new Date().getDate() + index)).getDay())[1]}. ${day}.${month}</p></div>
                     <div class="row weatherIconRow">
                         <div class="col">
                                 <img class="dailyIcon" src="static/css/icons/${data.days[index].hours[10].icon}.png"/>                             
                         </div> 
                          <div class="col">
                                 <img class="dailyIcon" src="static/css/icons/${data.days[index].hours[22].icon}.png"/>                               
                         </div>
                     </div>
                     <div class="row">
                     <div class="col">
                             <div class="row"><p class="dailyTemperature text-center">${Math.round(Math.max(...data.days[index].hours.map(e => e.feelslike)))}°C</p></div>
                    </div>
                     <div class="col">
                             <div class="row"><p class="dailyTemperature text-center">${Math.round(Math.min(...data.days[index].hours.map(e => e.feelslike)))}°C</p></div>
                      </div>
                    </div>
                </div>
    </div> `
}

function isDay(data) {
    const current = new Date().getTime() / 1000
    if (current < data.currentConditions.sunriseEpoch) {
        return 0 //morning night
    }
    if (data.currentConditions.sunriseEpoch < current < data.currentConditions.sunsetEpoch) {
        return 1 //day
    }
    if (current > data.currentConditions.sunsetEpoch) {
        return 2 //evening night
    }
}

function getNight(data) {
    if (isDay(data) === 1) {
        const objectDate = new Date()
        let day = objectDate.getDate();
        let month = (objectDate.getMonth() + 1) < 10 ? `0${objectDate.getMonth() + 1}` : objectDate.getMonth() + 1;
        return `<div class="row nextWeatherData">
                    <div class="col">
                        <p class="nextDayHeader text-center">${setDay(new Date().getDay())[1]} ${day}.${month}</p>
                        <div class="row weatherIconRow">
                            <img src="static/css/icons/moon${getMoonPhase(data.currentConditions.moonphase)}.png"/>
                        </div>
                        <div class="row"><p class="dailyTemperature text-center">${Math.round(Math.max(...data.days[0].hours.map(e => e.temp)))}°C</p></div>
                    </div>
                </div>`
    } else if (isDay(data) === 0) {
        `<div class="row">${setDay(new Date().getDay())[1]}</div>
        <div class="row">    
        </div>
<div class="row"></div>`
    } else return ''
}

function getCurrentWeather(data) {
    let dayTime = isDay(data)
    let value = ''
    if (dayTime === 1) {
        value = ` <div class="row" onclick="showDailyPerHours(0)">
              <img class="weatherIcon" src="static/css/icons/${data.currentConditions.icon}.png"/>
            </div>`
    } else {
        value = ` <div class="row">
              <img class="weatherIcon" src="static/css/icons/${data.currentConditions.icon}${getMoonPhase(Number(data.currentConditions.moonphase))}.png"/>
            </div>`
    }
    return value
}

function showDailyPerHours(day){
    $.post("/log",day,function (res) {

    })


    const data= dailyData
    clearTimeout(globalTimeout)
    document.getElementById('weatherIcon').innerHTML = `
<div class="row">
 <div class="col">${setDataPerHourAtDay(data.days[day].hours, 8)}</div>
 <div class="col">${setDataPerHourAtDay(data.days[day].hours, 10)}</div>
 <div class="col">${setDataPerHourAtDay(data.days[day].hours, 12)}</div>
</div>

<div class="row">
 <div class="col">${setDataPerHourAtDay(data.days[day].hours, 14)}</div>
 <div class="col">${setDataPerHourAtDay(data.days[day].hours, 16)}</div>
 <div class="col">${setDataPerHourAtDay(data.days[day].hours, 18)}</div>
</div>
`

    globalTimeout =  setTimeout(() => {
        document.getElementById('weatherIcon').innerHTML = getCurrentWeather(data)

    },10000)
}

function setDataPerHourAtDay(data, hour){
   return `<div class="row"><div class="col"><p
        class="text-center">${hour}:00</p></div>
        </div>
    <div class="row weatherIconHours">
        <div class="col text-center">
            <img class="hoursIcon" src="static/css/icons/${data[hour].icon}.png"/>
        </div>      
    </div>
<div class="row"><div class="col"><p
        class="text-center">${Math.round(data[hour].feelslike)}°C ${data[hour].windspeed} km/h</p>
        </div>
</div>`
}

function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}


function getMoonPhase(phase) {
    phase = Number(phase)
    if (phase === 0) {
        return 0
    }
    if (phase < 0.25) {
        return 1
    }
    if (0.25 === phase) {
        return 2

    }
    if (phase < 0.5) {
        return 3

    }
    if (phase === 0.5) {
        return 4

    }
    if (phase < 0.75) {
        return 5

    }
    if (phase === 0.75) {
        return 6

    }
    if (0.75 < phase) {
        return 7

    }
}

function setDay(day) {
    switch (Number(day)) {
        case 1:
            return ['Poniedziałek', 'PN']
        case 2:
            return ['Wtorek', 'WT']
        case 3:
            return ['Środa', 'ŚR']
        case 4:
            return ['Czwartek', 'CZW']
        case 5:
            return ['Piątek', 'PT']
        case 6:
            return ['Sobota', 'SOB']
        case 0:
            return ['Niedziela', 'ND']

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
