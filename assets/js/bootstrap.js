import scrollSnapPolyfill from 'css-scroll-snap-polyfill'


// window._ = require('lodash');
window.Popper = require('popper.js').default;
window.axios = require('axios');
window.$jsonp = require('axios-jsonp')
window.Sniddl = require('../../public/sniddl-ajax')
window.$history = window.$history || []
var Socket = require('../../lib/sockets-client')

window.socket = new Socket()
socket.room(location.pathname).subscribe()
// socket.message('hello world').of('mytype').send()
// socket.onMessage('mytype', function (msg) {
//   console.log(msg);
// })




// console.log(socket);


// require('sniddl-spa')


// window.fa = require('@fortawesome/fontawesome-pro')

// window.today = function() {
//   var d = new Date();
//   var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//   var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`
// }

try {
    window.$ = window.jQuery = require('jquery');
    require('bootstrap');
    // require('jquery-touchswipe')
    require('./client-router')
    require('./router')
    require('jquery-autocompleter')
    require('../../lib/jquery-plugins')
    // console.log('tried to load jquery');
} catch (e) {}



$(document).ready(function () {
  scrollSnapPolyfill()
})

$(window).on('hashchange load', function () {
  Sniddl.init('.linkable', {
    addCss: true,
    headers: {},
    params: {}
  })
})



$(document).on('click', 'a', function (e) {
  // console.log($(this));
  e.preventDefault()
  e.stopPropagation()
  window.location = $(this).attr('href')
  return false
})

// $('.grid').masonry({
//   itemSelector: '.grid-item',
// });
