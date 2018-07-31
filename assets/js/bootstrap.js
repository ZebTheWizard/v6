import scrollSnapPolyfill from 'css-scroll-snap-polyfill'


// window._ = require('lodash');
window.Popper = require('popper.js').default;
window.axios = require('axios');
window.Sniddl = require('sniddl-ajax')
window.$history = window.$history || []


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
    // console.log('tried to load jquery');
} catch (e) {}



$(document).ready(function () {
  scrollSnapPolyfill()
  console.log(window.jQuery);
  $('#auto-download').autocompleter({
    highlightMatches: true,
    source: '/download/json',
    asLocal: true,
    customLabel: 'name',
    template: `
    <div class="list-group-item list-group-item-action list-autocomplete">
        <span class="h6">{{ label }}</span>
        <span class="pl-2 small text-muted">{{ version }}</span>
        <span class="pl-2 small text-muted">{{ type }}</span>
    </div>`,
    hint: true,
    empty: false,
    limit: 5,
    callback(value, index, selected) {
      if (selected) {
        console.log(selected._id);
        window.location.href = "/download/edit/" + selected._id
      }
    }

  })
})

$(window).on('hashchange load', function () {
  Sniddl.init('.linkable', {
    addCss: true,
    headers: {},
    params: {}
  })
})

// $('.grid').masonry({
//   itemSelector: '.grid-item',
// });
