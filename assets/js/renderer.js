
window.cookie = require('../../lib/cookie')
window.Time = require('../../lib/time')
window.Size = require('../../lib/size')
window.Autocomplete = require('../../lib/autocomplete')

window.getDate = function() {
  var d = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`
}
