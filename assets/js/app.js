require('./bootstrap')

$(document).ready(function () {
  $('#auto-download').autocompleter({
    highlightMatches: true,
    source: '/download/json',
    asLocal: true,
    customLabel: 'name',
    template: `
    <div class="list-group-item list-group-item-action list-autocomplete">
        <span class="h6">{{ label }}</span>
        <span class="pl-2 small text-muted">{{ version }}</span>
    </div>`,
    hint: true,
    empty: false,
    limit: 5,
    callback(value, index, selected) {
      if (selected) {
        window.location.href = "/download/edit/" + selected._id
      }
    }

  })
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

console.log(`socket.emit('subscribe', ${location.pathname})`);
socket.emit('subscribe', location.pathname)

socket.on('ipa-progress-message', function (progress) {
  console.log(progress);
  if (progress.status === 'done') return location.reload()
  $('#ipa-progress-status').html(progress.status)
  $('#ipa-progress-amount').css("width", progress.amount + '%')
})
// io.on('connection', function (socket) {
//   console.log('connected to socket stream');
// })

// $('.toolbar-bottom .item').click(function () {
//   $('.toolbar-bottom .item').removeClass('active')
//   $(this).addClass('active')
// })

// console.log('hello world');
