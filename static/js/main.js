function updateTime() {
    // $.get("/time", function (data) {
    //     $("#time").text(data[0]);
    //     $("#day").text(`${setDay(data[1])} ${data[2]}`);
    // });
    let objectDate = new Date();
    let day = objectDate.getDate();
    let month = objectDate.getMonth() +1;
    let year = objectDate.getFullYear();
    let date = `${day}.${month}.${year}`;

    $("#time").text(`${objectDate.getHours()}:${objectDate.getMinutes()}`);
    $("#day").text(`${date}`);
}

setInterval(updateTime, 1000);

function setDay(day) {
    switch (Number(day)) {
        case 0:
            return 'Poniedziałek'
        case 1:
            return 'Wtorek'
        case 2:
            return 'Środa'
        case 3:
            return 'Czwartek'
        case 4:
            return 'Piątek'
        case 5:
            return 'Sobota'
        case 6:
            return 'Niedziela'

    }
}