import scrollSnapPolyfill from 'css-scroll-snap-polyfill'


window.Popper = require('popper.js').default;
window.axios = require('axios');
window.Sniddl = require('../../public/sniddl-ajax')
window.$history = window.$history || []
window.markdown = require('../../lib/markdown')
window.SocketClient = require('../../lib/sockets-client')
require('../../lib/colorpicker')

window.socket = new SocketClient()
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
  var scrolls = JSON.parse(sessionStorage.getItem('scroll-positions') || '{}')
  $(window).scrollTop(scrolls[window.location.href] || 0)
})


$(window).on('hashchange load', function () {
  Sniddl.init('.linkable', {
    addCss: true,
    headers: {},
    params: {}
  })
})



$(document).on('click', 'a', function (e) {
  if (!navigator.platform.match(/iPhone|iPod|iPad/)) return
  e.preventDefault()
  e.stopPropagation()
  window.location = $(this).attr('href')
  return false
})

$(window).on('pagehide unload', function (e) {
  var scrolls = JSON.parse(sessionStorage.getItem('scroll-positions') || '{}')
  scrolls[window.location.href] = $(window).scrollTop()
  sessionStorage.setItem('scroll-positions', JSON.stringify(scrolls))
})
