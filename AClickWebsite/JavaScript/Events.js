$(document).ready(function () {
    $('#magicClick').click(function () {
        AddMagic(1);
        player[SaveValuesEnum.totalMagickClicks]++;
        update_view();
    })

    $('#pureClick').click(function () {
        var costOfStuff = pureCostStart.getCost(player[SaveValuesEnum.pure]);
        if (player[SaveValuesEnum.magick] < costOfStuff) return;
        player[SaveValuesEnum.pure]++;
        player[SaveValuesEnum.magick] -= costOfStuff;
        update_view();
    })

    $('#puddleClick').click(function () {
        var costOfStuff = puddleCostStart.getCost(player[SaveValuesEnum.puddles]);
        if (player[SaveValuesEnum.pure] < costOfStuff) return;
        player[SaveValuesEnum.puddles]++;
        player[SaveValuesEnum.pure] -= costOfStuff;
        update_view();
    })

    $('#bookClick').click(function () {
        if (player[SaveValuesEnum.pure] < basicBookCost) return;
        player[SaveValuesEnum.pure] -= basicBookCost;
        player[SaveValuesEnum.hasBasicBook] = 1;
        player[SaveValuesEnum.maxMagick] = 200;
        hiddenUpdate();
        update_view();
    })
})

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(data));
}