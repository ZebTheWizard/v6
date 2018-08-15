$.favicon = function (url) {
  return $('.site-favicon').attr('href', url)
}

$.fn.showClassIf = function (bool, classname) {
  if (bool) this.addClass(classname)
  else this.removeClass(classname)
  return this
}

$('*[data-remove]').click(function (e) {
  $($(e.currentTarget).data('remove')).remove()
})

$('*[data-collapse]').click(function (e) {
  $($(e.currentTarget).data('collapse')).collapse('toggle')
})
