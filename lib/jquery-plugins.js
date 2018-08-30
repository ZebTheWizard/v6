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


$('*[data-rating]').click(function () {
  var p = $(this).parent()
  p.find('.rating').removeClass('selected')
  $(this).addClass('selected')
  axios.post($(this).data('url'), {
    id: $(this).data('id'),
    value: $(this).data('rating')
  }).then(res => {
    p.find('.rating-heart').html(res.data['😍'].count)
    p.find('.rating-smile').html(res.data['🙂'].count)
    p.find('.rating-frown').html(res.data['😕'].count)
    p.find('.rating-angry').html(res.data['😡'].count)
    console.log(res);
  })

})

$('*[data-bind-color]').each(function () {
  var target = $(this).data('bind-color')
  var prop = $(this).data('bind-color-prop') || 'color'
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
  window.$oldScrollHeight = $(window).scrollTop()
  var target = $(this).data('modal')
  $('#' + target).html(Mustache.render($modals[target], $(this).data()))
  $('#' + target).modal('toggle')
  if ($('#' + target).hasClass('modal-page')) {
    $('#' + target).show()
    $('.hide-on-modal-page').hide()
    $('.modal-backdrop').hide()
    $('#' + target).parent().addClass('has-modal-page')
    $(window).scrollTop(0)
  }
  Sniddl.init('.linkable', {
    addCss: true,
    headers: {},
    params: {}
  })
})

$(document).on('click', '*[data-modal-close]', function (e) {
  var target = $(this).data('modal-close')
  $('#' + target).modal('hide')
  $('#' + target).hide()
  $('#' + target).parent().removeClass('has-modal-page')
  $('.hide-on-modal-page').show()
  $(window).scrollTop(window.$oldScrollHeight)
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
