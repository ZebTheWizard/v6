import scrollSnapPolyfill from 'css-scroll-snap-polyfill'


window._ = require('lodash');
window.Popper = require('popper.js').default;
window.axios = require('axios');
window.Sniddl = require('sniddl-ajax')
window.$history = window.$history || []

// require('sniddl-spa')

Sniddl.init('.linkable', {
  addCss: true,
  headers: {},
  params: {}
})
// window.fa = require('@fortawesome/fontawesome-pro')

window.today = function() {
  var d = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`
}

try {
    window.$ = window.jQuery = require('jquery');
    require('bootstrap');
    // require('jquery-touchswipe')
    require('./client-router')
    require('./router')
    // console.log('tried to load jquery');
} catch (e) {}




$(document).ready(function () {
  scrollSnapPolyfill()
})
