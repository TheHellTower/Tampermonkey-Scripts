// ==UserScript==
// @name         Cracked.io Ads Remover
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove the Cracked.io Ads
// @author       https://cracked.io/TheHellTower
// @match        https://cracked.io
// @grant        none
// ==/UserScript==

(function() {
    window.addEventListener('load', function() {
        document.getElementsByClassName("inner_stuff")[0].remove()
    });
})();
