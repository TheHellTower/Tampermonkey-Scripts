// ==UserScript==
// @name         Cracked.io Shoutbox Remover
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove the Cracked.io Shoutbox
// @author       https://cracked.io/TheHellTower
// @match        https://cracked.io
// @grant        none
// ==/UserScript==

(function() {
    window.addEventListener('load', function() {
        document.getElementById("shoutbox").remove();
    });
})();
