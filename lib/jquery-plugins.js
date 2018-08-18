$.favicon = function (url) {
  return $('.site-favicon').attr('href', url)
}

$.fn.showClassIf = function (bool, classname) {
  if (bool) this.addClass(classname)
  else this.removeClass(classname)
  return this
}

$(document).on('click', '*[data-remove]', function (e) {
  $($(e.currentTarget).data('remove')).remove()
})

$(document).on('click', '*[data-collapse]', function (e) {
  $($(e.currentTarget).data('collapse')).collapse('toggle')
})

$('.modal').each(function () {
  window.$modals = window.$modals || new Object()
  $modals[$(this).attr('id')] = $(this).html()
  $(this).html('')
})

$(document).on('click', '*[data-modal]', function (e) {
  var target = $(this).data('modal')
  $('#' + target).html(Mustache.render($modals[target], $(this).data()))
  $('#' + target).modal('toggle')
})

$(document).on('click', '*[data-modal-close]', function (e) {
  var target = $(this).data('modal-close')
  $('#' + target).modal('hide')
})
