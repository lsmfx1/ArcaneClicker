function magickClick(number) {
    var newMagick = player[SaveValuesEnum.magick] + number;
    newMagick > player[SaveValuesEnum.maxMagick] ? player[SaveValuesEnum.magick] = player[SaveValuesEnum.maxMagick] : player[SaveValuesEnum.magick] = newMagick;
    player[SaveValuesEnum.totalMagickClicks]++;
    update_view();
};

function pureClick(number) {
    var costOfStuff = pureCostStart.getCost(player[SaveValuesEnum.pure]);
    if (player[SaveValuesEnum.magick] < costOfStuff) return;
    player[SaveValuesEnum.pure]++;
    player[SaveValuesEnum.magick] -= costOfStuff;
    update_view();
};

function puddleClick(number) {
    var costOfStuff = puddleCostStart.getCost(player[SaveValuesEnum.puddles]);
    if (player[SaveValuesEnum.pure] < costOfStuff) return;
    player[SaveValuesEnum.puddles]++;
    player[SaveValuesEnum.pure] -= costOfStuff;
    update_view();
};
$(document).ready(function(){
    $('#bookClick').click(function () {
        if (player[SaveValuesEnum.pure] < basicBookCost) return;
        player[SaveValuesEnum.pure] -= basicBookCost;
        player[SaveValuesEnum.hasBasicBook] = 1;
        player[SaveValuesEnum.maxMagick] = 200;
        $(this).addClass('btnHidden');
        $('#puddleClick').removeClass('btnHidden');
        update_view();
    })
})

function bookClick() {
    if (player[SaveValuesEnum.pure] < basicBookCost) return;
    player[SaveValuesEnum.pure] -= basicBookCost;
    player[SaveValuesEnum.hasBasicBook] = 1;
    player[SaveValuesEnum.maxMagick] = 200;
    //$('bookClick').addClass('hidden');
    document.getElementById("bookClick").disabled = player[SaveValuesEnum.hasBasicBook];
    update_view();
}