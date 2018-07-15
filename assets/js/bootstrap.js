import scrollSnapPolyfill from 'css-scroll-snap-polyfill'

window._ = require('lodash');
window.Popper = require('popper.js').default;

try {
    window.$ = window.jQuery = require('jquery');
    require('bootstrap');
} catch (e) {}

$(document).ready(function () {
  scrollSnapPolyfill()
})
