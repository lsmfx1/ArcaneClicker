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

//add elements to array
function hiddenUpdate() {
    if (player[SaveValuesEnum.hasBasicBook]) {
        $('#puddleClick').removeClass('Hidden');
        $('#earth').removeClass('Hidden');
        $('#fire').removeClass('Hidden');
        $('#metal').removeClass('Hidden');
        $('#pot').removeClass('Hidden');
        $('#water').removeClass('Hidden');
        $('#wood').removeClass('Hidden');
        $('#bookClick').addClass('Hidden');
    }
    else {
        $('#puddleClick').addClass('Hidden');
        $('#earth').addClass('Hidden');
        $('#fire').addClass('Hidden');
        $('#metal').addClass('Hidden');
        $('#pot').addClass('Hidden');
        $('#water').addClass('Hidden');
        $('#wood').addClass('Hidden');
        $('#bookClick').removeClass('Hidden');
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
        AddMagic(player[SaveValuesEnum.puddles]);
    }, 1000);
}

function UpdateALL() {
    hiddenUpdate();
    update_view();
    update_screen();
    update_time();
}

setInterval(function () {
    timeSinceLastSave == 10 ? save_game() : timeSinceLastSave++;
    update_view();
}, 1000);

//Notes: Chi, Jing