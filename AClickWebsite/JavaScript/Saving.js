Array.prototype.loadData = function (loadArray) {
    for (i = 0; i < loadArray.length; i++)
    { player[i] = loadArray[i]; }
}

function reset_game() {
    if (confirm('Are you sure you want to delete all stats?')) {
        player_defults();
        save_game();
        UpdateALL();
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
    UpdateALL();
}

load_game();
UpdateALL();
$('#Research').data('reset', $('#Mixture').html());