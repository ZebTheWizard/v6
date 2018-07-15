import scrollSnapPolyfill from 'css-scroll-snap-polyfill'

window._ = require('lodash');
window.Popper = require('popper.js').default;

try {
    window.$ = window.jQuery = require('jquery');
    require('bootstrap');
} catch (e) {}

$(document).ready(function () {
  $('.carousel').carousel({
    interval: false
  })

  $('.carousel').bind('wheel', function (e) {
    if (e.originalEvent.deltaX > 0) {
      $(this).carousel('next')
    } else if (e.originalEvent.deltaX < 0) {
      $(this).carousel('prev')
    }
  })
})
