const increaseRate = 1.25;
const pureCostStart = 10;
const puddleCostStart = 1;
const basicBookCost = 5;
var timeSinceLastSave = 1;
var pureCost = pureCostStart;
var puddleCost = puddleCostStart;
var player = {
    totalMagickClicks: 0,
    magick: 0,
    maxMagick: 50,
    pure: 0,
    puddles: 0,
    hasBasicBook: 0,
    interval_auto: null
}

function player_defults()
{
    player.totalMagickClicks = 0;
    player.magick = 0;
    player.maxMagick = 50;
    player.pure = 0;
    player.puddles = 0;
    player.hasBasicBook = 0;
    player.interval_auto = null;
}

function reset_game() {
    if (confirm('Are you sure you want to delete all stats?')) {
        player_defults();
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
    player_defults();
    player = save_data;
    update_view();
}

function magickClick(number) {
    var newMagick = player.magick + number;
    newMagick > player.maxMagick ? player.magick = player.maxMagick : player.magick = newMagick;
    player.totalMagickClicks++;
    update_view();
};

function pureClick(number) {
    if (player.magick < pureCost) return;
    player.pure++;
    player.magick -= pureCost;
    update_view();
};

function puddleClick(number) {
    if (player.pure < puddleCost) return;
    player.puddles++;
    player.pure -= puddleCost;
    update_view();
};

function bookClick() {
    if (player.pure < basicBookCost) return;
    player.pure -= basicBookCost;
    player.hasBasicBook = 1;
    player.maxMagick = 200;
    update_view();
}

function viewClick(id) {
    //need to make an array of sections
    //need to make css of active/unactive
    document.getElementById("Generation").hidden = "Generation" != id;
    document.getElementById("Research").hidden = "Research" != id;
}

function update_view() {
    //buttons
    document.getElementById("puddleClick").hidden = !player.hasBasicBook;
    document.getElementById("bookClick").disabled = player.hasBasicBook;
    //values
    document.getElementById("magick").innerHTML = player.magick;
    document.getElementById("maxMagick").innerHTML = player.maxMagick;
    document.title = player.magick + "¤ | Arcane Clicker";
    document.getElementById('pure').innerHTML = player.pure;
    pureCost = Math.floor(pureCostStart * Math.pow(increaseRate, player.pure));
    document.getElementById("pureCost").innerHTML = pureCost;
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
//Notes: Chi, Jing