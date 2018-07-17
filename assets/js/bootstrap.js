import scrollSnapPolyfill from 'css-scroll-snap-polyfill'


window._ = require('lodash');
window.Popper = require('popper.js').default;
window.Sniddl = require('sniddl-ajax')
require('sniddl-spa')

Sniddl.init('.linkable', {
  addCss: true,
  headers: {},
  params: {}
})
// window.fa = require('@fortawesome/fontawesome-pro')

try {
    window.$ = window.jQuery = require('jquery');
    require('bootstrap');
    require('jquery-touchswipe')
} catch (e) {}

function setDates() {
  var d = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  console.log(`${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`);
  $('.today').html(`${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`)
}

$(document).ready(function () {
  scrollSnapPolyfill()

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

$(window).on('hashchange', function () {
  // setDates()
  setTimeout(function () {
    $('.today').each(function () {
      $(this).get()[0].innerHTML = 'asdf'
      // console.log($(this).get(), $(this).html());
    })
  }, 100)

})
