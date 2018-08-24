
let Time = (function () {
  let $$ = new WeakMap()

  class Time extends Date {
    constructor(...args) {
      super()
      $$.set(this, {
        date: new Date(...args)
      })
    }
    date () {
      return $$.get(this).date
    }
    static format ($date, string) {
      const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
      const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
      var date = $date.getDate()
      var day = $date.getDay()
      var month = $date.getMonth()
      var year = $date.getFullYear()
      /* 
      var string = string.split('d').join(date.padStart(2, '0'))
      var string = string.split('D').join(days[day].substring(0,3)) 
      */
      var string = string.split('$j').join(date)
      var string = string.split('$l').join(days[day])
      var string = string.split('$F').join(months[month])
      /*
      var string = string.split('N').join(() => day ? day : 7)
      var string = string.split('S').join(() => {
        var d = date < 4 ? date : 4
        var ord = ['st', 'nd', 'rd', 'th']
        return ord[d-1]
      })
      var string = string.split('w').join(day)
      */
      var string = string.split('$M').join(months[month].substring(0,3))
      var string = string.split('$Y').join(year)
      return string
    }
    static msToAgo(ms) {
      var _ = (a, b) => Math.floor(a / b)
      var t = {year: 31104000000, month: 2592000000, week: 604800000, day: 86400000, hour: 3600000, minute: 60000, second: 1000}
      if (ms < t.second) return this.config.now
      if (ms < t.minute) return _(ms, t.second) + this.config.s
      if (ms < t.hour) return _(ms, t.minute) + this.config.m
      if (ms < t.day) return _(ms, t.hour) + this.config.h
      if (ms < t.week) return _(ms, t.day) + this.config.d
      if (ms < t.month) return _(ms, t.week) + this.config.w
      if (ms < t.year) return this.format(new Date(this.now() - ms), this.config.month)
      return this.format(new Date(this.now() - ms), this.config.year)
    }

    ago() {
      return Time.msToAgo(Time.now() - this.date())
    }
  }

  Time.config = {
    now: "just now",
    s: "s",
    m: "m",
    h: "h",
    d: "d",
    w: "w",
    month: "M j",
    year: "j M Y",
  }

  return Time
})()



module.exports = Time
