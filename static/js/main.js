function updateTime() {
    $.get("/time", function(data) {
        $("#time").text(data);
    });
}
setInterval(updateTime, 1000);