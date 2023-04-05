function updateTime() {

    let objectDate = new Date();
    let day = objectDate.getDate();
    let dayNumber = objectDate.getDay()  ;
    let month = (objectDate.getMonth() +1) < 10 ? `0${objectDate.getMonth() +1}` : objectDate.getMonth() +1 ;
    let year = objectDate.getFullYear();
    let date = `${day}.${month}.${year}`;

    $("#time").text(`${objectDate.getHours()}:${objectDate.getMinutes() < 10 ? '0' + objectDate.getMinutes() : objectDate.getMinutes()}`);
    $("#day").text(`${setDay(dayNumber)} ${date}`);
}

setInterval(updateTime, 1000);

function setDay(day) {
    switch (Number(day)) {
        case 1:
            return 'Poniedziałek'
        case 2:
            return 'Wtorek'
        case 3:
            return 'Środa'
        case 4:
            return 'Czwartek'
        case 5:
            return 'Piątek'
        case 6:
            return 'Sobota'
        case 0:
            return 'Niedziela'

    }
}