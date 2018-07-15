require('./bootstrap')

$.fn.oldScroll = $.fn.scroll

$.fn.scroll = function (done) {
  this.oldScroll(function (e) {
    e.target.oldScrollLeft = e.target.oldScrollLeft || 0
    e.target.oldScrollTop = e.target.oldScrollTop || 0

    if (e.target.oldScrollLeft < $(this).scrollLeft()) e.target.scrollDirection = 'right'
    else if (e.target.oldScrollLeft > $(this).scrollLeft()) e.target.scrollDirection = 'left'
    else if (e.target.oldScrollTop < $(this).scrollTop()) e.target.scrollDirection = 'down'
    else if (e.target.oldScrollTop > $(this).scrollTop()) e.target.scrollDirection = 'up'

    done(e)
    e.target.oldScrollLeft = $(this).scrollLeft()
    e.target.oldScrollTop = $(this).scrollTop()
  })
}

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

// $('.item-slider').scroll(function (e) {
//   e.target.oldScrollLeft = e.target.oldScrollLeft || 0
//   var direction =
//   e.target.oldScrollLeft = $(this).scrollLeft()
// })

// $('.item-slider.sliding').scroll(function (e) {
//   e.preventDefault()
//   return false
// })

// $('.item-slider').scroll(function (e) {
//
//   let scrollAmount = 0
//   if (e.target.scrollDirection === 'right') {
//     scrollAmount = $(e.target).width()
//   } else if (e.target.scrollDirection === 'left') {
//     scrollAmount = $(e.target).width() * -1
//   }
//   console.log(scrollAmount);
//   $('.item-slider').addClass('sliding').animate({
//     scrollLeft: scrollAmount
//   }, 800, 'swing', function () {
//     $(this).removeClass('sliding')
//   })
//   // e.target.oldScrollLeft = e.target.oldScrollLeft || 0
//   // var direction =
//   // e.target.oldScrollLeft = $(this).scrollLeft()
// })

// (function () {
//   let lastStop = 0
//   $('.item-slider').not('.scrolling').scroll(_.debounce(function(){
//       console.log('scrolling');
//   }, 150, { 'leading': true, 'trailing': false }));
//   $('.item-slider').not('.scrolling').scroll(_.debounce(function(){
//       console.log('stopped');
//       lastStop =
//   }, 150));
// })()
