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

  window.scrolling = true
})


// $('.toolbar-bottom .item').click(function () {
//   $('.toolbar-bottom .item').removeClass('active')
//   $(this).addClass('active')
// })

// console.log('hello world');
