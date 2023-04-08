function updateTime() {

    let objectDate = new Date();
    let day = objectDate.getDate();
    let dayNumber = objectDate.getDay()  ;
    let month = (objectDate.getMonth() +1) < 10 ? `0${objectDate.getMonth() +1}` : objectDate.getMonth() +1 ;
    let year = objectDate.getFullYear();
    let date = `${day}.${month}.${year}`;
    document.getElementById('time').innerHTML = `<p>${objectDate.getHours()}:${objectDate.getMinutes() < 10 ? '0' + objectDate.getMinutes() : objectDate.getMinutes()}</p>`
    document.getElementById('day').innerHTML = `<p>${setDay(dayNumber)[0]} ${date}</p>`
}

setInterval(updateTime, 1000);

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