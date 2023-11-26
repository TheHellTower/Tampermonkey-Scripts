// ==UserScript==
// @name         Cracked.io Focus Menu
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Cracked.io Focus Menu
// @author       https://cracked.io/TheHellTower
// @match        https://cracked.io/*
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://code.jquery.com/jquery-3.6.4.min.js
// ==/UserScript==

var keys = ["hideShoutbox", "hideAds", "hideLastActivities", "hideRecentThreads"];

function applyConfig() {
    try {
        if (GM_getValue(keys[0], false)) {
            document.getElementById("shoutbox").remove();
        }

        if (GM_getValue(keys[1], false)) {
            if(document.location.href.length <= 19) {
                document.getElementsByClassName("inner_stuff")[0].remove();
                document.getElementsByClassName("scaleimages")[1].remove();
                document.querySelectorAll("#inner-container > div")[1].remove();
            }
        }

        if (GM_getValue(keys[2], false)) {
            document.querySelectorAll('table.tborder').forEach(table => (table.querySelector('thead td.thead')?.innerText.trim() === 'Latest Activities') && table.remove());
        }

        if (GM_getValue(keys[3], false)) {
            document.querySelectorAll('table.tborder').forEach(table => (table.querySelector('thead td.thead')?.innerText.trim() === 'Recent Threads') && table.remove());
        }
    } catch {
        //No.
    }
}

//document.querySelectorAll('table.tborder').forEach(table => table.querySelector('thead td.thead').innerText.trim() === 'Latest Activities' && table.remove());

function initGUI() {
    const guiDiv = $('<div id="myGui"></div>').css({
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        background: '#212121',
        color: '#aaa',
        border: '2px solid #ccc',
        'box-shadow': '0 0 10px rgba(0, 0, 0, 0.2)',
        'z-index': '1000',
        display: 'none',
        'border-radius': '10px',
    });

    const title = $('<h2>Cracked.IO Menu<span style="text-decoration: underline;">(Focus)</span></h2>').css({
        margin: '0 0 10px',
        color: "#fff"
    });


    const hideShoutboxCheckbox = $(`<label><input type="checkbox" id="${keys[0]}">Hide Shoutbox</label>`).css({
        display: 'block',
        margin: '5px 0',
    });

    const hideAdsCheckbox = $(`<label><input type="checkbox" id="${keys[1]}">Hide Ads</label>`).css({
        display: 'block',
        margin: '5px 0',
    });

    const hideLastActivitiesCheckbox = $(`<label><input type="checkbox" id="${keys[2]}">Hide Last Activities</label>`).css({
        display: 'block',
        margin: '5px 0',
    });

    const hideRecentThreadsCheckbox = $(`<label><input type="checkbox" id="${keys[3]}">Hide Recent Threads</label>`).css({
        display: 'block',
        margin: '5px 0',
    });

    const applyButton = $('<button id="applyButton">Apply</button>').css({
        display: 'block',
        margin: '10px auto',
        padding: '5px 10px',
        background: '#2b2b2b',
        color: '#fff',
        border: 'none',
        'border-radius': '3px',
        cursor: 'pointer',
    });

    guiDiv.append(title).append(hideShoutboxCheckbox).append(hideAdsCheckbox).append(hideLastActivitiesCheckbox).append(hideRecentThreadsCheckbox).append(applyButton);

    $('body').append(guiDiv);

    keys.forEach(function(key, index){
        document.getElementById(key).checked = GM_getValue(key, false);
    });

    applyButton.on('click', function () {
        keys.forEach(function(key, index){
            GM_setValue(key, document.getElementById(key).checked);
        });

        window.location.reload();
    });

    $(document).on('keydown', function (e) {
        if (e.ctrlKey && e.key === 'm') {
            guiDiv.toggle();
            applyConfig();
        }
    });
}

$(document).ready(function () {
    initGUI();
    applyConfig();
});
