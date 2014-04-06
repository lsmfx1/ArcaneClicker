var UIEnabledElements = new Array();
var UIDisabledElements = new Array();

Number.prototype.getCost = function (quantity) {
    return Math.floor(this * Math.pow(increaseRate, quantity));
}

//Maybe change to builtin
function setShortenedTime(location, value) {
    //4 K 7 M 11 B 14 T 17 Qi 20 Qa 23 Sx 26 Sp
    //should store in an array
    var letter = "";
}

function viewClick(id) {
    //need to make css of active/unactive
    player[SaveValuesEnum.currentScreen] = id;
    update_screen();
}

function statupUpdate() {
    if (player[SaveValuesEnum.hasBasicBook]) {
        $('#puddleClick').removeClass('btnHidden');
        $('#bookClick').addClass('btnHidden');
    }
    else {
        $('#puddleClick').addClass('btnHidden');
        $('#bookClick').removeClass('btnHidden');
    }
    update_view();
}

function update_view() {
    var displayMath;
    //title
    document.title = player[SaveValuesEnum.magick] + "¤ | Arcane Clicker";
    //values
    document.getElementById("magick").innerHTML = player[SaveValuesEnum.magick];
    document.getElementById("maxMagick").innerHTML = player[SaveValuesEnum.maxMagick];
    document.getElementById('pure').innerHTML = player[SaveValuesEnum.pure];
    document.getElementById('puddles').innerHTML = player[SaveValuesEnum.puddles];
    //Prices
    displayMath = pureCostStart.getCost(player[SaveValuesEnum.pure]);
    document.getElementById("pureCost").innerHTML = displayMath;
    displayMath = puddleCostStart.getCost(player[SaveValuesEnum.puddles]);
    document.getElementById("puddleCost").innerHTML = displayMath;
    //footer
    document.getElementById("lastSave").innerHTML = timeSinceLastSave;
}

//possibly use remove class/add class
function update_screen() {
    var match;
    var className;
    for (i = 0; i < ScreenNames.length; i++) {
        match = ScreenNames[i] == player[SaveValuesEnum.currentScreen];
        match ? className = "selectedView" : className = "nonSelectedView";
        document.getElementById(ScreenNames[i] + "Span").className = className;
        document.getElementById(ScreenNames[i]).hidden = !match;
    }
}

function update_time() {
    clearInterval(player[SaveValuesEnum.interval_auto]);
    player[SaveValuesEnum.interval_auto] = setInterval(function () {
        magickClick(player[SaveValuesEnum.puddles]);
    }, 1000);
}

function UpdateALL() {
    statupUpdate();
    update_view();
    update_screen();
    update_time();
}

setInterval(function () {
    timeSinceLastSave == 10 ? save_game() : timeSinceLastSave++;
    update_view();
}, 1000);

//Notes: Chi, Jing