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

// $(window).on('beforeunload', function () {
//   return 'Are you sure you want to leave?'
// })

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

function updateIPAProgress(progress) {
  if (progress.status === 'done') return location.reload()
  $('#ipa-progress-status').html(progress.status)
  $('#ipa-progress-amount').css("width", progress.amount + '%')
}

console.log(`socket.emit('subscribe', ${location.pathname})`);
socket.emit('subscribe', location.pathname)

socket.on('ipa-progress-message', function (progress) {
  updateIPAProgress(progress)
})
// io.on('connection', function (socket) {
//   console.log('connected to socket stream');
// })

// $('.toolbar-bottom .item').click(function () {
//   $('.toolbar-bottom .item').removeClass('active')
//   $(this).addClass('active')
// })

// console.log('hello world');
function uploadingIPA(e) {
  updateIPAProgress({ status: 'uploading', amount:  e.loaded / e.total * 100})
}

function downloadIPA(e) {
  updateIPAProgress({ status: 'processing upload', amount:  e.loaded / e.total * 100})
}

$('#ipa-form').on('submit', function (e) {
  e.preventDefault()
  window.onbeforeunload = function () {
    var t = 'Leaving will cause upload to stop & fail. Still want to leave?'
    e.returnValue = t;
    return t;
  }
  var cardBody = `<div class="card-body">
    <h4>Updating IPA</h4>
    <div class="mt-3 mb-1 small" id="ipa-progress-status"></div>
    <div class="progress mb-3">
      <div id="ipa-progress-amount" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"></div>
    </div>
  </div>`
  if ($('#download-progress-card').length) {
    $('#download-progress-card').after(cardBody)
    $('#download-progress-card').hide()
  } else {
    $('#ipa-form').after(`<div class="mx-auto mt-4 col-12 col-md-6" >
      <div class="card p-2 bg-gradient-light">
        ${cardBody}
      </div>
    </div>`)
  }
  $('#ipa-form').hide()

  axios.post('/download/update', new FormData(e.target), {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: uploadingIPA,
    onDownloadProgress: downloadIPA
  }).then(res => {
    window.onbeforeunload = function () {}
    return location.reload()
    console.log(res.data);
  })
})
