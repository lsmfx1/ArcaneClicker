var SaveValuesEnum = Object.freeze({
    interval_auto: 0,//0 for loop
    magick: 1,
    maxMagick: 2,//1-9 for basic things
    pure: 10, //10-99 for elements
    puddles: 100, //100-199 for specials
    hasBasicBook: 200, //200-500 for variables
    totalMagickClicks: 500, //500+ for stats
});
const increaseRate = 1.25;
const pureCostStart = 10;
const puddleCostStart = 1;
const basicBookCost = 5;
var timeSinceLastSave = 1;
var pureCost = pureCostStart;
var puddleCost = puddleCostStart;
var player = new Array();
player_defults();
function player_defults() {
    player[SaveValuesEnum.interval_auto] = null;
    player[SaveValuesEnum.magick] = 0;
    player[SaveValuesEnum.maxMagick] = 50;
    player[SaveValuesEnum.pure] = 0;
    player[SaveValuesEnum.puddles] = 0;
    player[SaveValuesEnum.hasBasicBook] = 0;
    player[SaveValuesEnum.totalMagickClicks] = 0;
}

Array.prototype.loadData = function (loadArray) {
    for (i = 0; i < loadArray.length; i++)
    { player[i] = loadArray[i]; }
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
    save_game();
    if (!localStorage['ArcaneClicker_save']) return alert("No game data saved yet!");
    prompt("Please Copy this text!", localStorage['ArcaneClicker_save']);
}

function importClick() {
    var importValue = prompt("Please paste in provided text from export");
    if (!importValue) return;
    load_game_string(importValue);
    save_game();
}
function load_game() {
    if (!localStorage['ArcaneClicker_save']) return;
    load_game_string(localStorage['ArcaneClicker_save']);
}

function load_game_string(loadedGame) {
    var save_data = JSON.parse(atob(loadedGame));
    if (!(save_data instanceof Array)) return alert("Save data invalid, it is highly suggested you reset!!!");
    player_defults();
    player.loadData(save_data);
    update_view();
}

function magickClick(number) {
    var newMagick = player[SaveValuesEnum.magick] + number;
    newMagick > player[SaveValuesEnum.maxMagick] ? player[SaveValuesEnum.magick] = player[SaveValuesEnum.maxMagick] : player[SaveValuesEnum.magick] = newMagick;
    player[SaveValuesEnum.totalMagickClicks]++;
    update_view();
};

function pureClick(number) {
    if (player[SaveValuesEnum.magick] < pureCost) return;
    player[SaveValuesEnum.pure]++;
    player[SaveValuesEnum.magick] -= pureCost;
    update_view();
};

function puddleClick(number) {
    if (player[SaveValuesEnum.pure] < puddleCost) return;
    player[SaveValuesEnum.puddles]++;
    player[SaveValuesEnum.pure] -= puddleCost;
    update_view();
};

function bookClick() {
    if (player[SaveValuesEnum.pure] < basicBookCost) return;
    player[SaveValuesEnum.pure] -= basicBookCost;
    player[SaveValuesEnum.hasBasicBook] = 1;
    player[SaveValuesEnum.maxMagick] = 200;
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
    document.getElementById("puddleClick").hidden = !player[SaveValuesEnum.hasBasicBook];
    document.getElementById("bookClick").disabled = player[SaveValuesEnum.hasBasicBook];
    //values
    document.getElementById("magick").innerHTML = player[SaveValuesEnum.magick];
    document.getElementById("maxMagick").innerHTML = player[SaveValuesEnum.maxMagick];
    document.title = player[SaveValuesEnum.magick] + "¤ | Arcane Clicker";
    document.getElementById('pure').innerHTML = player[SaveValuesEnum.pure];
    pureCost = Math.floor(pureCostStart * Math.pow(increaseRate, player[SaveValuesEnum.pure]));
    document.getElementById("pureCost").innerHTML = pureCost;
    document.getElementById('puddles').innerHTML = player[SaveValuesEnum.puddles];
    puddleCost = Math.floor(puddleCostStart * Math.pow(increaseRate, player[SaveValuesEnum.puddles]));
    document.getElementById("puddleCost").innerHTML = puddleCost;
    document.getElementById("lastSave").innerHTML = timeSinceLastSave;
}

function setShortenedTime(location, value) {
    //4 K 7 M 11 B 14 T 17 Qi 20 Qa 23 Sx 26 Sp
    //should store in an array
    var letter = "";
}

function update_time() {
    clearInterval(player[SaveValuesEnum.interval_auto]);
    player[SaveValuesEnum.interval_auto] = setInterval(function () {
        magickClick(player[SaveValuesEnum.puddles]);
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