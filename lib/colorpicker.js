function clamp (num, min, max) {
  return Math.min(Math.max(num, min), max)
}

function strchunk(str, amount) {
  return str.match(new RegExp(`.{1,${amount}}`, 'g'))
}

function hex (num, pad=2) {
  return num.toString(16).padStart(pad, 0)
}

function dehex (num, amount=2) {
  return strchunk(num, amount).map(chunk => parseInt(chunk, 16))
}

function percent (num, decimals=2) {
  return (num * 100).toFixed(decimals) + '%'
}

function RGBtoHEX(r, g, b) {
  return `${hex(r)}${hex(g)}${hex(b)}`
}

function HSBtoRGB(h, s, b, toHex=false) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, b = h.b, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = b * (1 - s);
    q = b * (1 - f * s);
    t = b * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = b, g = t, b = p; break;
        case 1: r = q, g = b, b = p; break;
        case 2: r = p, g = b, b = t; break;
        case 3: r = p, g = q, b = b; break;
        case 4: r = t, g = p, b = b; break;
        case 5: r = b, g = p, b = q; break;
    }
    var v = x => Math.round(x * 255);
    if (toHex) return `${hex(v(r))}${hex(v(g))}${hex(v(b))}`
    return [v(r), v(g), v(b)];
}

function RGBtoHSB(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  var rr, gg, bb,
      h, s,
      v = Math.max(r, g, b),
      diff = v - Math.min(r, g, b),
      diffc = c => (v - c) / 6 / diff + 1 / 2

  if (diff == 0) h = s = 0;
  else {
      s = diff / v;
      rr = diffc(r);
      gg = diffc(g);
      bb = diffc(b);

      if (r === v) h = bb - gg
      else if (g === v) h = (1 / 3) + rr - bb;
      else if (b === v) h = (2 / 3) + gg - rr;

      if (h < 0) h ++
      else if (h > 1) h --
  }
  return [h, s, v];
}

function html (html) {
  var div = document.createElement('div')
  div.innerHTML = html.trim()
  return div.firstChild
}
function style (id, css) {
  var style = document.createElement('style')
  style.id = id
  style.textContent = css.trim()
  return style
}
function setData (el, obj) {
  Object.keys(obj).forEach(key => {
    el.dataset[key] = obj[key]
  })
}

function disableselect(e) {
  e.preventDefault()
}


class ColorPicker {
  constructor(options={}) {
    this.$ = document.createElement('div')
    this.$.className = 'color-picker'
    this.$.appendChild(html(`
      <div class="color-picker-internals">
        <div class="cp">
          <div class="cpp"></div>
        </div>
        <div class="hp">
          <div class="hpp"></div>
        </div>
      </div>

    `))
    this.$.options = {
      width: parseInt(options.width || 100),
      height: parseInt(options.height || 100),
      unit: options.unit || 'px',
      hex: options.hex || '#000000'
    }
    setData(this.$, options)
    this.$data = {
      changingHue: false,
      h: 0,
      s: 0,
      b: 0,
    }
    this.$cb = () => null
    this.$.onColorChange = this.onColorChange.bind(this)
    this.$.cp = this.$.querySelector('.cp');
    this.$.pointer = this.$.querySelector('.cpp');
    this.$.hp = this.$.querySelector('.hp');
    this.$.hpp = this.$.querySelector('.hpp');
    this.$el = this.$.cp
    if(!document.getElementById('color-picker-style')) this.addStyleSheet()
    this.$.cp.addEventListener('mousedown', e => {
      window.addEventListener('selectstart', disableselect)
      this.$.mouseIsDown = true
      this.$el = this.$.cp
      if(this.mousedown) this.mousedown(e)
    })
    this.$.hp.addEventListener('mousedown', e => {
      window.addEventListener('selectstart', disableselect)
      this.$.mouseIsDown = true
      this.$el = this.$.hp
      if(this.mousedown) this.mousedown(e)
    })
    window.addEventListener('mousemove', e => {
      if (!this.$.mouseIsDown) return
      if(this.mousemove) this.mousemove(e)
    })
    window.addEventListener('mouseup', e => {
      window.removeEventListener('selectstart', disableselect)
      this.$.mouseIsDown = false
      if(this.mouseup) this.mouseup(e)
    })
    this.setCoordsFromHex(this.$.options.hex)
  }
  create() {
    return this.$
  }
  mousedown (e) {
    this.$el.getMouseCoords = e => {
      var coords = this.$el.getBoundingClientRect()
      var doc = document.documentElement;
      var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
      var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
      return {
        x: clamp(e.pageX - coords.x - left, 0, coords.width) / coords.width,
        y: clamp(e.pageY - coords.y - top, 0, coords.height) / coords.height,
      }
    }

    this.$el.style.cursor = 'default'
    if (this.$el.isSameNode(this.$.cp)) {
      this.getHexFromCoords(this.$el.getMouseCoords(e).x, this.$el.getMouseCoords(e).y)
    }
    if (this.$el.isSameNode(this.$.hp)) {
      this.getHueFromCoord(this.$el.getMouseCoords(e).x)
    }
  }
  mousemove (e) {
    this.$el.style.cursor = 'pointer'
    if (this.$el.isSameNode(this.$.cp)) {
      this.$data.y = 1 - this.$el.getMouseCoords(e).y
      this.getHexFromCoords(this.$el.getMouseCoords(e).x, this.$el.getMouseCoords(e).y)
    }
    if (this.$el.isSameNode(this.$.hp)) {
      this.getHueFromCoord(this.$el.getMouseCoords(e).x)
    }
  }
  mouseup (e) {
    this.$el.style.cursor = 'default'
    this.$data.changingHue = false
  }
  getHexFromCoords(x, y, fireEvent=true) {
    var coord = (this.$data.changingHue) ? 1 - y : y
    this.$data.b = (this.$data.changingHue) ? y: 1 - y
    this.$data.s = x
    this.$.pointer.style.left = percent(x)
    this.$.pointer.style.top = percent(coord)
    this.$.options.hex = HSBtoRGB(this.$data.h, this.$data.s, this.$data.b, true)
    if (fireEvent) this.fire()
  }
  getHueFromCoord(x, fireEvent=true) {
    this.$data.changingHue = true
    this.$.hpp.style.left = percent(x)
    this.$data.h = x
    this.$.cp.style.backgroundColor = '#' + HSBtoRGB(this.$data.h, 1, 1, true)
    this.getHexFromCoords(this.$data.s, this.$data.b, fireEvent)
    this.$data.changingHue = fireEvent
    // this.$.options.hex = HSBtoRGB(0, x, 1 - y, true)
  }
  setCoordsFromHex(hex) {
    if (hex.startsWith('#')) hex = hex.slice(1)
    if (hex.length === 3) hex = hex.split('').map(x => x + x).join('')
    var hsb = RGBtoHSB(...dehex(hex))
    this.$data.h = hsb[0]
    this.$data.s = hsb[1]
    this.$data.b = 1 - hsb[2]
    this.getHexFromCoords(this.$data.s, this.$data.b, false)
    this.getHueFromCoord(this.$data.h, false)
    this.fire()
  }
  fire () {
    this.$cb(this.$)
  }
  onColorChange(cb) {
    this.$cb = cb
  }
  addStyleSheet() {
    document.head.appendChild(style('color-picker-style',`
      .color-picker {

      }
      .color-picker-internals {
        height: ${this.$.options.height + this.$.options.height / 10 + this.$.options.height / 20}${this.$.options.unit};
        width: ${this.$.options.width}${this.$.options.unit};
        display: block;
        position: relative;
      }
      .cp {
        width: ${this.$.options.width}${this.$.options.unit};
        height: ${this.$.options.height}${this.$.options.unit};
        cursor: default;
        float: left;
        background-color: red;
        position: relative;
        background-image: -moz-linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
        background-image: -webkit-linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
        background-image: linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#ffffff",GradientType=1);
      }
      .cp:after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: -moz-linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
        background-image: -webkit-linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
        background-image: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#000000",GradientType=1);
      }

      .cpp {
        width: ${Math.min(this.$.options.height, this.$.options.width) / 20}${this.$.options.unit};
        height: ${Math.min(this.$.options.height, this.$.options.width) / 20}${this.$.options.unit};
        border: 1px solid #fff;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0px 0px 0px 1px black;
        z-index: 1;
      }
      .hp {
        height: ${this.$.options.height / 10}${this.$.options.unit};
        width: ${this.$.options.width}${this.$.options.unit};
        position: absolute;
        bottom: 0;
        cursor: default;
        background: -moz-linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,255,0,1) 17%, rgba(0,255,0,1) 33%, rgba(0,255,255,1) 50%, rgba(0,0,255,1) 66%, rgba(255,0,255,1) 83%, rgba(255,0,0,1) 100%);
        background: -webkit-linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,255,0,1) 17%, rgba(0,255,0,1) 33%, rgba(0,255,255,1) 50%, rgba(0,0,255,1) 66%, rgba(255,0,255,1) 83%, rgba(255,0,0,1) 100%);
        background: linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,255,0,1) 17%, rgba(0,255,0,1) 33%, rgba(0,255,255,1) 50%, rgba(0,0,255,1) 66%, rgba(255,0,255,1) 83%, rgba(255,0,0,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff0000",endColorstr="#ff0000",GradientType=1);
      }
      .hpp {
        position: absolute;
        width: ${this.$.options.height / 35}${this.$.options.unit};
        height: 110%;
        display: block;
        border: 2px solid white;
        box-shadow: 0px 0px 0px 2px black;
        border-radius: 30px;
        top: 50%;
        left: 76%;
        transform: translate(-50%, -50%);
      }
    `))
  }
}

(function () {
  document.querySelectorAll('.color-picker').forEach(node => {
    var c = node.className
    var colorpicker = new ColorPicker(node.dataset).create()
    node.parentNode.replaceChild(colorpicker, node)
    colorpicker.className = node.className
    // r.className = c
  })
})()
