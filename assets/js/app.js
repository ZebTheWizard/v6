require('./bootstrap')
var ejs = require('./ejs')

function render(path, data={}) {
  return ejs.render(require(`../templates/${path}.html`), data, {
    delimiter: '?'
  })
}

function autocomplete(obj) {
  return {
    highlightMatches: true,
    source: obj.source,
    asLocal: true,
    customLabel: 'name',
    template: render(obj.template),
    hint: true,
    empty: false,
    limit: 5,
    callback: obj.callback
  }
}

$(document).ready(function () {
  $('.auto-download').autocompleter(autocomplete({
      source: '/download/json',
      template: 'autocomplete-download',
      callback(value, index, selected) {
        console.log(value, index, selected);
        var el = $(this).parent().find('input')
        if (selected && el.attr('id') === 'ipa-redirect') {
          window.location.href = "/download/edit/" + selected._id
        }
        else if (selected && el.attr('id') === 'add-ipa-version') {
          $('#app-ipas').append(render('addipaversion', selected))
          el.val('')
        }
      }
  }))
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
