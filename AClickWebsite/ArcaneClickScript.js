const increaseRate = 1.25;
const puddleCostStart = 10;
var timeSinceLastSave = 1;
var player = {
totalClicks: 0,
magick: 0,
puddles: 0,
interval_auto: null
}

function reset_game() {
    if (confirm('Are you sure you want to delete all stats?')) {
        player.totalClicks = 0;
        player.magick = 0;
        player.puddles = 0;
        player.interval_auto = null;
        save_game();
        update_view();
    }
}

function save_game() {
    localStorage['ArcaneClicker_save'] = btoa(JSON.stringify(player));
    if (!localStorage['ArcaneClicker_save']) return alert("Save failed");
    timeSinceLastSave = 1;
    update_view();
}

function exportClick() {
    if (!localStorage['ArcaneClicker_save']) return alert("No game data saved yet!");
    prompt("Please Copy this text!", localStorage['ArcaneClicker_save']);
}

function importClick() {
    var importValue = prompt("Please paste in provided text from export");
    if (!importValue) return; //Remove this message
    load_game_string(importValue);
}
function load_game() {
    if (!localStorage['ArcaneClicker_save']) return;
    load_game_string(localStorage['ArcaneClicker_save']);
}

function load_game_string(loadedGame)
{
    var save_data = JSON.parse(atob(loadedGame));
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
    }
    update_view();
};

function update_view() {
    document.getElementById("magick").innerHTML = player.magick;
    document.title = player.magick + "¤ | Arcane Clicker";
    document.getElementById('puddles').innerHTML = player.puddles;
    puddleCost = Math.floor(puddleCostStart * Math.pow(increaseRate, player.puddles));
    document.getElementById("puddleCost").innerHTML = puddleCost;
    document.getElementById("lastSave").innerHTML = timeSinceLastSave;
}

function setShortenedTime(location, value)
{
    //4 K 7 M 11 B 14 T 17 Qi 20 Qa 23 Sx 26 Sp
    //should store in an array
    var letter = "";
}

function update_time() {
    clearInterval(player.interval_auto);
    player.interval_auto = setInterval(function () {
        magickClick(player.puddles);
    }, 1000);
}

//start time
update_time();

load_game();
//auto-save
setInterval(function () {
    timeSinceLastSave == 10 ? save_game() : timeSinceLastSave++;
    update_view();
}, 1000);