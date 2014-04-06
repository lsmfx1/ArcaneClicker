const increaseRate = 1.25;
const pureCostStart = 10;
const puddleCostStart = 1;
const basicBookCost = 5;
var timeSinceLastSave = 1;
var player = new Array();
var ScreenNames = new Array("Generation", "Research");
var SaveValuesEnum = Object.freeze({
    interval_auto: 0,//0 for loop
    magick: 1,
    maxMagick: 2,
    currentScreen: 3,//1-9 for basic things
    pure: 10, //10-99 for elements
    puddles: 100, //100-199 for specials
    hasBasicBook: 200, //200-500 for variables
    totalMagickClicks: 500, //500+ for stats
});

//Possibly combine vars of amount and amount it goes up by
function player_defults() {
    player[SaveValuesEnum.interval_auto] = null;
    player[SaveValuesEnum.magick] = 0;
    player[SaveValuesEnum.maxMagick] = 50;
    player[SaveValuesEnum.currentScreen] = ScreenNames[0];
    player[SaveValuesEnum.pure] = 0;
    player[SaveValuesEnum.puddles] = 0;
    player[SaveValuesEnum.hasBasicBook] = 0;
    player[SaveValuesEnum.totalMagickClicks] = 0;
}

player_defults();