setInterval(function () {
    var color = "hsl(" + rand(0, 360)
        + "," + rand(70, 100) + "%," + rand(35, 55) + "%)";
    console.log(color);
    document.body.style.backgroundColor = color;
}, 1000);

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
