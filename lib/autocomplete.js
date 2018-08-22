var ejs = require('../assets/js/ejs')

let Autocomplete = (function () {
  let $$ = new WeakMap()
  let $n = (el, where, html) => {
    el.insertAdjacentHTML(where, html)
    if (where === 'beforeend') return el.previousSibling
    if (where === 'afterbegin') return el.firstElementChild
    if (where === 'beforeend') return el.lastElementChild
    if (where === 'afterend') return el.nextSibling
    return null
  }

  class Autocomplete {
    constructor(el) {
      this.$el = el
      this.$options = Object.assign(new Object, el.dataset)
      this.$options.insert = this.$options.insert || 'beforeend'
      this.$options.search = this.$options.search || 'name'
      this.$options.limit = this.$options.limit || 10
      this.$options.results = el.querySelector('.autocomplete-results')
      this.$options.input = el.querySelector('input')
      this.$options.data = data => data
      this.$data = {}
      this.$results = {}
      this.$match = () => true
    }

    init() {
      return new Promise( (resolve, reject) => {
        console.log(this.$options);
        this.fetchSource().then(data => {
          this.$data = this.$options.data(data)
          if (!this.$options.input) {
            this.$options.input = $n(this.$el, 'afterbegin', `<input type="text" />`)
          }
          if (!this.$options.results) {
            this.$options.results = $n(this.$el, this.$options.insert, `<div class="autocomplete-results"></div>`)
          }
          this.watch()
          resolve(this)
        })
      });
    }

    watch() {
      this.$el.oninput = this.change.bind(this)
    }

    change(e) {
      var query = this.$options.input.value
      if (!query) {
        this.$options.results.innerHTML = ''
        return
      }
      this.$results = JSON.parse(JSON.stringify(this.$data.filter(item => this.$match(item, query))
                                .slice(0, this.$options.limit)))

      this.$options.results.innerHTML = ''
      console.log(this.$results);
      this.$results.forEach(item => {
        var obj = item
        var props = this.$options.search.split('.')
        var prop = props.pop()
        props.forEach(p => {
          item[p] = item[p] || {}
          obj = item[p]
        })
        obj[prop] = obj[prop].split(new RegExp(query, 'i')).join('<span class="autocomplete-match">' + query + '</span>')
        // console.log(item);
        this.$options.results.insertAdjacentHTML('beforeend', ejs.render(this.$template, item, Object.assign({
          context: item
        },this.$templateOptions)))
      })
    }


    template(val, options) {
      this.$template = val
      this.$templateOptions = options
      return this
    }
    match(cb) {
      this.$match = cb
      return this
    }
    settings(val) {
      this.$options = Object.assign(this.$options, val)
      return this
    }

    fetchSource() {
      return new Promise((resolve, reject) => {
        fetch(this.$options.source)
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(err => reject(err))
      });
    }
  }


  return Autocomplete
})()



module.exports = Autocomplete
