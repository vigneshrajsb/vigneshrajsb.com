/* Plays the name's pronunciation clip. The Audio object is created on first
   click so the page loads nothing until someone asks to hear it. */
(function () {
    'use strict';

    var button = document.querySelector('.masthead .pronounce');
    if (!button) return;

    var clip;
    button.addEventListener('click', function () {
        if (!clip) clip = new Audio('/assets/pronounce-vignesh.m4a');
        clip.currentTime = 0;
        clip.play();
    });
})();
