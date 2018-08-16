function Sniddl(query) {
  var elements = document.querySelectorAll(query);
  var list = [];
  for (var i = 0; i < elements.length; i++) {
    if (elements[i]["__sniddl__"]) list.push(elements[i])
  }
  return list;
}

function domWatcher (options, cb) { // { type, query}
  if (document.readyState !== 'complete') return
  var el = document.body
  var config = { attributes: true, childList: true, subtree: true}
  var obs = new MutationObserver(function (record) {
    for (var i = 0; i < record.length; i++) {
      var event = record[i]
      if (event.type === 'childList' && typeof event.addedNodes[0].matches === 'function') {
        if (event.addedNodes[0].matches(options.query) && event.type === options.type) {
          cb(event, event.target)
        }
      } else {
        if (event.target.matches(options.query) && event.type === options.type) {
          cb(event, event.target)
        }
      }

    }
  })
  obs.observe(el, config)
}

function live (event, query, cb) {
  document.addEventListener(event, function (e) {
    console.log(e, 'asdfasdf');
    e.currentEl = e.target.closest(query)
    if (!e.currentEl) return
    cb(e, e.currentEl.$sniddl)
  }, true)
}

Sniddl.set = function(query, key, value, init=false) {
  var elements = document.querySelectorAll(query);
  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    el.$sniddl.$data = el.$sniddl.$data || {}
    var old = el.$sniddl.$data;
    el.$sniddl.$data[key] = value
    // if (el.$sniddl.onmount && init) window[el.$sniddl.onmount](el.$sniddl, el.$sniddl.$data, old)
    // else if (el.$sniddl.onbind && !init) window[el.$sniddl.onbind](el.$sniddl, el.$sniddl.$data, old)
  }
}

var alreadyWatchingDom = false

Sniddl.init = function(query, options={}) {
  if (options.addCss) Sniddl.addCss(query);
  // document.addEventListener('DOMContentLoaded', function () {
  var elements = document.querySelectorAll(query);
  if (!alreadyWatchingDom) {
    live('click', query, Sniddl.click)
    domWatcher({ type: 'childList', query: query},function (e, el) {
      Sniddl.init(query, options)
    })
    alreadyWatchingDom = true
  }

  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    if (el.$sniddl) continue
    Object.defineProperty(el, '$sniddl', {
      get () {
        return this.__sniddl__.make()
      },
      set (val) {
        return this.__sniddl__ = val
      }
    })
    el["$sniddl"] = new SniddlComponent(el, options);
  }
}

Sniddl.addCss = function(query) {
  var css = query + ', ' + 'query' + ':hover{cursor: pointer;}';
  var style = document.createElement('style');
  if (style.styleSheet) style.styleSheet.cssText = css;
  else style.appendChild(document.createTextNode(css));
  document.getElementsByTagName('head')[0].appendChild(style);
}

Sniddl.click = function(e, s) {
  console.log(e);
  e.preventDefault();
  e.stopPropagation();

  if(e.target.href) {
    console.log('trying to link href');
    if (e.target.href) return window.open(e.target.href, e.target.target)
    window.location = e.target.href
    return false
  }
  // var s = this.$sniddl;
  if (!s.method) {
    console.log('trying to link url');
    if (s.blank) return window.open(s.url, '_blank')
    window.location = s.url
    return false
  }
  else if (s.redirect) s.formRequest()
  else return s.xmlRequest()
}


SniddlComponent.prototype.getAttr = function (str) {
  if (!this.el.hasAttribute(str)) return this[str]
  return this.el.getAttribute(str);
}

SniddlComponent.prototype.hasAttr = function (str) {
  if (!this.el.hasAttribute(str)) return this[str]
  return this.el.hasAttribute(str);
}

function SniddlComponent(el, options) {
  this.el = el;
  this.$data = {}
  this.data = options.params;
  this.headers = options.headers;
  this.make()
  this.removeAttributes('url data-url params data-params method data-method onerror data-onerror onsuccess data-onsuccess redirect data-redirect blank data-blank');
  if (this.params) this.params = JSON.parse(this.params);
  this.params = Object.assign(this.params || {}, this.data);
  // this.el.onclick = this.click;
}

SniddlComponent.prototype.make = function() {
  var a = this.getAttr.bind(this);
  var h = this.hasAttr.bind(this);
  this.url = a('url') || a('data-url');
  this.params =  a('params') || a('data-params');
  this.method =  a('method') || a('data-method');
  this.onerror =  a('onerror') || a('data-onerror') || console.error;
  this.onsuccess = a('onsuccess') || a('data-onsuccess');
  this.redirect = h('redirect') || h('data-redirect');
  this.blank = h('blank') || h('data-blank');
  return this

}

SniddlComponent.prototype.removeAttributes = function(str) {
  var attrs = str.split(' ')
  for (var i = 0; i < attrs.length; i++) {
    this.el.removeAttribute(attrs[i])
  }
}


SniddlComponent.prototype.formRequest = function(data) {
  var form = document.createElement('form');
  form.setAttribute('method', this.method);
  form.setAttribute('action', this.url);
  form.style.display = 'none';
  document.body.appendChild(form);
  for (var key in this.params) {
    var input = document.createElement('input');
    input.setAttribute('name', key);
    input.setAttribute('value', this.params[key]);
    input.setAttribute('type', 'hidden');
    form.appendChild(input)
  }
  form.submit()
}


SniddlComponent.prototype.xmlRequest = function() {
  var data = this.make()
  console.log(data.url);
  var x = new XMLHttpRequest();
  x.open(data.method, data.url);
  if (data.headers) {
    for (var key in data.headers) {
      x.setRequestHeader(key, data.headers[key]);
    }
  }
  x.onload = function () {
    var res = JSON.parse(x.responseText);
    if (x.status >= 200 && x.status < 300 && data.onsuccess) {
      window[data.onsuccess](data, res)
    } else if (x.status < 200 || x.status >= 300) {
      if (data.onerror === console.error) console.error('Sniddl Ajax Response Error:', res);
      else window[data.onerror](data, res)
    }
  }.bind(data)
  x.send(JSON.stringify(data.params))
}

SniddlComponent.prototype.constructor = SniddlComponent;

try {
  module.exports = Sniddl
} catch (e) {

}
