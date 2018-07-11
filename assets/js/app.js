// require('./bootstrap')

import Framework7 from 'framework7'
import { Dom7 } from 'framework7/'

var $$ = Dom7

var app = new Framework7({
  root: '#app',
  name: 'My App',
  id: 'co.ioshaven.v5',
  theme: 'ios',
  panel: {
    swipe: 'left'
  },
  routes: [
    { name: 'Index', path: '/', url: '/' },
    { name: 'About', path: '/about', url: '/about' },
    { name: 'Login', path: '/login', url: '/login' },
    { name: 'Profile', path: '/user', url: '/user' }
  ]
})

var mainView = app.views.create('.screen-main')

// app.onPageInit('login-screen', function(page) {
//   var pageContainer = $$(page.container)
//   page
// })
// var mainView = app.loginScreen.create('.screen-login')
