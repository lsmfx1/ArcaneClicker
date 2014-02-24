const increaseRate = 1.25;
var puddleCost = 10;

var player = {
totalClicks: 0,
magick: 0,
puddles: 0,
interval_auto: null
}

function save_game() {
    localStorage['ArcaneClicker_save'] = btoa(JSON.stringify(player));
}

function load_game() {
    if (!localStorage['ArcaneClicker_save']) return;
    var save_data = JSON.parse(atob(localStorage['ArcaneClicker_save']));
    player = save_data;
    update_view();
}

function magickClick(number) {
    player.magick += number;
    player.totalClicks++;
    update_view();
};

function puddleClick(number) {
    if (player.magick >= puddleCost) {
        player.puddles++;
        player.magick -= puddleCost;
        puddleCost = Math.floor(10 * Math.pow(increaseRate,player.puddles));
    }
    update_view();
};

function update_view() {
    document.getElementById('puddles').innerHTML = player.puddles;
    document.getElementById("magick").innerHTML = player.magick;
    document.getElementById("puddleCost").innerHTML = puddleCost;
}

function update_time() {
    clearInterval(player.interval_auto);
    player.interval_auto = setInterval(function () {
        magickClick(player.puddles);
    }, 1000);
}

load_game();
//start time
update_time();
setInterval(function () { save_game(); }, 10000);