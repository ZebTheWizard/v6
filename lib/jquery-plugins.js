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

$('*[data-bind]').each(function () {
  var options = $(this).data('options') || {everything: true}
  var target = $(this).data('bind')
  $(this).html(markdown($(target).val(), options))
  $(document).on('input', target, (e) => {
    $(this).html(markdown($(target).val(), options))
  })
})

$('*[data-bind-color]').each(function () {
  var target = $(this).data('bind-color')
  var prop = $(this).data('bind-color-prop') || 'color'
  console.log($(target)[0]);
  this.style[prop] = '#' + $(target).val()
  $(target).on('change', e => {
    this.style[prop] = '#' + $(target).val()
  })
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
  $('body').css('overflow-y', 'hidden')
})

$(document).on('click', '*[data-modal-close]', function (e) {
  var target = $(this).data('modal-close')
  $('#' + target).modal('hide')
  $('body').css('overflow-y', 'auto')
})

$('.color-picker').each(function () {
  var well = $($(this).data('well'))
  var input = $($(this).data('input'))
  well.css('color', '#' + this.options.hex)
  well.click(e => {
    $('.color-picker').not(this).addClass('invisible')
    $(this).toggleClass('invisible')
  })
  var pop = new Popper(well[0], this, {placement: 'bottom'})
  this.onColorChange(el => {
    well.css('color', '#' + el.options.hex)
    input.val(el.options.hex).change()
  })
})
