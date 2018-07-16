require('./bootstrap')

$('*').on('touchstart', function (e) {
  var el = e.currentTarget
  el.swipe = { up: false, down: false, left: false, right: false}
  el.tsY = e.originalEvent.touches[0].clientY
  el.tsX = e.originalEvent.touches[0].clientX
})
$('*').on('touchmove', function (e) {
  var el = e.currentTarget
  el.teY = e.originalEvent.touches[0].clientY
  el.teX = e.originalEvent.touches[0].clientX

  el.swipe.left = (el.tsX > el.teX) ? true : false
  el.swipe.right = (el.tsX < el.teX) ? true : false
  // el.swipe.down = (el.tsY > el.teY) ? true : false
  // el.swipe.up = (el.tsY < el.teY) ? true : false

  if (el.tsX > el.teX) el.swipeDirection = 'left'
  else if (el.tsX < el.teX) el.swipeDirection = 'right'
  // else if (el.tsY > el.teY) el.swipeDirection = 'down'
  // else if (el.tsY < el.teY) el.swipeDirection = 'up'

})


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


// $('.item-slider').on('wheel', function (e) {
//   if (e.currentTarget.isScrolling) return
//   let scrollAmount = 0
//   if (e.originalEvent.deltaX > 0) {
//     scrollAmount = '+=' + $(e.currentTarget).width()
//   } else if (e.originalEvent.deltaX < 0) {
//     scrollAmount = '-=' + $(e.currentTarget).width()
//   }
//   e.currentTarget.isScrolling = true
//   $(this).animate({
//     scrollLeft: scrollAmount
//   }, 400, 'swing', function () {
//     e.currentTarget.isScrolling = false
//   })
// })

// $('.item-slider').swipe({
//   swipe (e, direction) {
//     let el = $(this).get()[0]
//     if (el.isScrolling) return
//     let scrollAmount = 0
//     if (direction === 'right') scrollAmount = '-=' + $(this).width()
//     else if (direction === 'left') scrollAmount = '+=' + $(this).width()
//     el.isScrolling = true
//     $(this).animate({
//       scrollLeft: scrollAmount
//     }, 400, 'swing', function () {
//       el.isScrolling = false
//     })
//   }
// })

// $('.item-slider').on('touchmove', function (e) {
//       let el = e.currentTarget
//       // if(el.swipe.down || el.swipe.up) return
//       if (el.isScrolling) return
//       e.preventDefault()
//       let scrollAmount = 0
//       // if (el.swipe.left || el.swipe.right) e.preventDefault()
//
//       if (el.swipe.right) scrollAmount = '-=' + $(el).width()
//       else if (el.swipe.left) scrollAmount = '+=' + $(el).width()
//       el.isScrolling = true
//       $(el).animate({
//         scrollLeft: scrollAmount
//       }, 400, 'swing', function () {
//         el.isScrolling = false
//       })
// })
