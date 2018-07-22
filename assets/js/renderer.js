// window.Mustache = require('mustache')
// class Site {
//   constructor(o) {
//     $(o.el).html(Mustache.render($(o.el).html(), o))
//   }
// }
//
// window.Site = Site

$('[data-today]').html((function () {
  var d = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`
})())
