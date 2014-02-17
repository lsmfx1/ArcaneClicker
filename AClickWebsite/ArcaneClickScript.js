const increaseRate = 1.25;
var magick = 0;
var puddles = 0;

function magickClick(number) {
    magick = magick + number;
    document.getElementById("magick").innerHTML = magick;
};

function puddleClick(number) {
    var puddleCost = Math.floor(10 * Math.pow(increaseRate, puddles));
    if (magick >= puddleCost) {
        puddles++;
        magick -= puddleCost;
        document.getElementById('puddles').innerHTML = puddles;
        document.getElementById("magick").innerHTML = magick;
        puddleCost = Math.floor(puddleCost * increaseRate);
    }
    document.getElementById("puddleCost").innerHTML = puddleCost;
};

window.setInterval(function () {

    magickClick(puddles);

}, 1000);