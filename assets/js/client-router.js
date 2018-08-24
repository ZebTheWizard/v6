Route = require('route-parser')
window.Mustache = require('mustache')


function route($route, cb) {
  var r = new Route($route)
  return new Promise(function(resolve, reject) {
    if (r.match(location.hash.substr(1))) cb(r.match).then(() => resolve())
    else resolve()
  });
}

function getPageAndPutIntoDOM(name, url, data, preload=false) {
  return axios.get(url).then(res => {
    var source = res.data
    var result = Mustache.render(source, data)
    window.$pages[name] = $('#page-' + name).length ? $('#page-' + name) : $(`<div id="page-${name}"></div>`).appendTo('#pages')
    window.$pages[name].addClass('page page-hidden').html(result)
    if (!preload) view(name)
  })
}

function loadPage(name, url, data={}) {
  window.$pages = window.$pages || new Object
  if (window.$pages[name]) {
    return new Promise(function(resolve, reject) {
      view(name)
      resolve()
    });
  }
  return getPageAndPutIntoDOM(name, url, data)
}

function view(page) {
  // window.$history = window.history || new Array
  $('#pages .page').addClass('page-hidden').removeClass('page-visible')
  $('.navigation-link').removeClass('active')
  $('#nav-' + page).addClass('active')
  $('#page-' + page).addClass('page-visible').removeClass('page-hidden')
  window.$hash = location.hash
}

backgroundLoad = function(name, url, data={}) {
  window.$pages = window.$pages || new Object
  if (window.$pages[name]) return
  return getPageAndPutIntoDOM(name, url, data, true)
}

window.loader = function(cb) {
  window.$loader = cb
}

window.router = function(cb, backgroundLoading) {
  window.$history.push(window.location.href || '')
  $(window).on('hashchange load', function () {
    window.$history.push(window.location.href || '')
    $('#pages .page').addClass('page-hidden').removeClass('page-visible')
    var promises = cb({
      route: route,
      render: loadPage,
      view: view
    })
    Promise.all(promises).then(() => {
      if (window.$loader) window.$loader(backgroundLoad)
    })
  })
  $(window).on('hashchange', function () {
    $('a.back').attr('href', window.$history.shift())
  })
}

$('a.internal').click(function (e) {
  e.preventDefault()
  window.location = $(this).attr('href')
})
