import scrollSnapPolyfill from 'css-scroll-snap-polyfill'


window.Popper = require('popper.js').default;
window.axios = require('axios');
window.Sniddl = require('../../public/sniddl-ajax')
window.$history = window.$history || []
window.markdown = require('../../lib/markdown')
var Socket = require('../../lib/sockets-client')
require('../../lib/colorpicker')

window.socket = new Socket()
socket.room(location.pathname).subscribe()

try {
    window.$ = window.jQuery = require('jquery');
    require('bootstrap');
    require('./client-router')
    require('./router')
    require('jquery-autocompleter')
    require('../../lib/jquery-plugins')
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
  e.preventDefault()
  e.stopPropagation()
  window.location = $(this).attr('href')
  return false
})
