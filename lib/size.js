// TODO: add method for integers

let Size = (function () {
  let $$ = new WeakMap()

  class Size {
    constructor(int) {
      $$.set(this, {
        int,
      })
    }
    toInt () {
      return $$.get(this).int
    }
    toString(decimals=1) {
      var i = this.toInt()
      var s = Size.config.sizes
      var a = Size.config.abbr
      var t = (num, abbr) => num.toFixed(decimals) + ' ' + abbr.toUpperCase()
      if (i < s.kb) return t(i, a.b)
      if (i < s.mb) return t(i / s.kb, a.kb)
      if (i < s.gb) return t(i / s.mb, a.mb)
      if (i < s.tb) return t(i / s.gb, a.gb)
      if (i < s.pb) return t(i / s.tb, a.tb)
      return t(i / s.pb, a.pb)
    }
  }

  Size.config = {
    sizes: {
      b: 1,
      kb: 1000,
      mb: 1000000,
      gb: 1000000000,
      tb: 1000000000000,
      pb: 1000000000000000,
    },
    abbr: {
      b: 'b',
      kb: 'kb',
      mb: 'mb',
      gb: 'gb',
      tb: 'tb',
      pb: 'pb',
    }

  }

  return Size
})()



module.exports = Size
