/* Masthead behaviors: the highlighter swipe and the pronounce clip. */
(function () {
    'use strict';

    /* The CSS wipe alone would freeze half-drawn if the pointer leaves
       mid-swipe (the resting transition holds whatever value it started
       from), so the first pointer entry pins the drawn state instead. */
    var name = document.querySelector('.masthead .name');
    if (name) {
        name.addEventListener('pointerenter', function mark() {
            name.classList.add('is-marked');
            name.removeEventListener('pointerenter', mark);
        });
    }

    /* The Audio object is created on first click so the page loads nothing
       until someone asks to hear the name. */
    var button = document.querySelector('.masthead .pronounce');
    if (button) {
        var clip;
        button.addEventListener('click', function () {
            if (!clip) clip = new Audio('/assets/pronounce-vignesh.m4a');
            clip.currentTime = 0;
            clip.play();
        });
    }
})();
