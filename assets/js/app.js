require('./bootstrap')
var ejs = require('./ejs')

function render(path, data={}) {
  return ejs.render(require(`../templates/${path}.html`), data, {
    delimiter: '?'
  })
}

$('.autocomplete').each(function () {
  new Autocomplete($(this)[0])
      .settings({
        results: $(this).find('.autocomplete-results')[0],
        input: $(this).find('input')[0],
      })
      .match((item, query) => item[$(this).data('search')].toLowerCase().includes(query.toLowerCase()))
      .template(require('../templates/' + $(this).data('template') + '.html'), {delimiter: '?'})
      .init()
})

$(window).scroll(function (e) {
  $('.page-title-fixed').showClassIf($(window).scrollTop() > 45, 'visible')
  $('.page-title-fixed').showClassIf($(window).scrollTop() > 59, 'has-border')
  window.scrolling = true
})

socket.onMessage('ipa-progress-message', function (msg) {
  renderIPAProgress(msg.data)
  $.favicon('/favicons/processing.png')
})

function renderIPAProgress(progress) {
  document.title = 'IOS Haven | ' + Math.floor(progress.amount) + '% - ' + progress.status
  var cardBody = render('ipa-progress-card')
  if ($('#ipa-info-card').length && !$('#ipa-progress-card').length) {
    $('#ipa-info-card').after(cardBody).remove()
  } else if (!$('#ipa-progress-card').length) {
    $('#ipa-form').after(render('card-top') + cardBody + render('card-bottom'))
  }
  if ($('#ipa-form').length) {
    $('#ipa-form').remove()
  }
  if (progress.reload) return location.reload()
  $('#ipa-progress-status').html(progress.status)
  $('#ipa-progress-amount').css("width", progress.amount + '%')
}


function uploadingIPA(e) {
  socket.message({
    status: 'uploading',
    amount:  e.loaded / e.total * 100
  }).of('ipa-progress-message').send()
}

function downloadIPA(e) {
  socket.message({
    status: 'processing upload',
    amount:  e.loaded / e.total * 100
  }).of('ipa-progress-message').send()
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
    socket.message({ status: 'upload validated', amount: 100, reload: true}).of('ipa-progress-message').send()
  })
})

var pullToRefresh = false
$(document).on('touchmove', function (e) {
  if ($('body').hasClass('modal-open')) return
  if (document.body.scrollTop < 10) {
    $('#refresher').css({
      'margin-top': `${parseInt(document.body.scrollTop)}px`,
      'height': `${Math.abs(parseInt(document.body.scrollTop))}px`,
    })
    $('.page-title-fixed').css({
      'margin-top': `${parseInt(document.body.scrollTop) * -1}px`,
    })
  }

  if (document.body.scrollTop < -80) {
    $('#refresher-icon').css({
      'opacity': `0.7`,
    })
    pullToRefresh = true
  }
})

$(document).on('touchend', function (e) {
  $('.page-title-fixed').css({
    'margin-top': `0px`,
  })
  $('#refresher').css({
    'margin-top': `-1000px`,
    'height': '0px'
  })
  $('#refresher-icon').css({
    'opacity': `0`,
  })
  if (pullToRefresh) window.location.reload()
})

function readImage(input, cb) {
  if (!input.files || !input.files[0]) return
  var reader = new FileReader()
  reader.onload = cb
  reader.readAsDataURL(input.files[0])
}

$('#article-upload').change(function (e) {
  readImage(this, function (e) {
    $('#article-preview-image').attr('src', e.target.result)
  })
})


$(document).on('click', '#add-ipa-to-app-trigger', function () {
  console.log('shoould be changing')
  $('#app-ipas').append(render('addipaversion', $(this).data()))
  $('#add-ipa-to-app').val('').change()
})
