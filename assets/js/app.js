require('./bootstrap')

$(window).scroll(function (e) {
  if ($(window).scrollTop() > 45) {
    $('.page-title-fixed').addClass('visible')
  } else {
    $('.page-title-fixed').removeClass('visible')
  }

  if ($(window).scrollTop() > 59) {
    $('.page-title-fixed').addClass('has-border')
  } else {
    $('.page-title-fixed').removeClass('has-border')
  }
})


$('.item-slider').on('wheel', function (e) {
  if (e.currentTarget.isScrolling) return
  let scrollAmount = 0
  if (e.originalEvent.deltaX > 0) {
    scrollAmount = '+=' + $(e.currentTarget).width()
  } else if (e.originalEvent.deltaX < 0) {
    scrollAmount = '-=' + $(e.currentTarget).width()
  }
  e.currentTarget.isScrolling = true
  $(this).animate({
    scrollLeft: scrollAmount
  }, 400, 'swing', function () {
    e.currentTarget.isScrolling = false
  })
})
