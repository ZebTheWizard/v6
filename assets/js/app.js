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

function updateIPAProgress(data) {
  socket.emit('send', {room: location.pathname, type: 'ipa-progress-message', data:data })
}

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

function renderIPAProgress(progress) {
  var cardBody = `<div class="card-body" id="ipa-progress-card">
    <h4>Updating IPA</h4>
    <div class="mt-3 mb-1 small" id="ipa-progress-status"></div>
    <div class="progress mb-3">
      <div id="ipa-progress-amount" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"></div>
    </div>
  </div>`
  if ($('#ipa-info-card').length && !$('#ipa-progress-card').length) {
    $('#ipa-info-card').after(cardBody)
    $('#ipa-info-card').remove()
  } else if (!$('#ipa-progress-card').length) {
    $('#ipa-form').after(`<div class="mx-auto mt-4 col-12 col-md-6" >
      <div class="card p-2 bg-gradient-light">
        ${cardBody}
      </div>
    </div>`)
  }
  if ($('#ipa-form').length) {
    $('#ipa-form').remove()
  }
  if (progress.reload) return location.reload()
  $('#ipa-progress-status').html(progress.status)
  $('#ipa-progress-amount').css("width", progress.amount + '%')
}

console.log(`socket.emit('subscribe', ${location.pathname})`);
socket.emit('subscribe', location.pathname)

socket.on('message', function (msg) {
  console.log(msg);
  if (msg.type === 'ipa-progress-message') renderIPAProgress(msg.data)
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


  axios.post('/download/update', new FormData(e.target), {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: uploadingIPA,
    onDownloadProgress: downloadIPA
  }).then(res => {
    window.onbeforeunload = function () {}
    console.log('AXIOS IS DONE');
    updateIPAProgress({ status: 'upload validated', amount: 100, reload: true})
  })
})
