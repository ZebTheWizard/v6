
loader(function (load) {
  load('login', '/spa/login')
})

router(function (router, queue) {
  return [
    router.route('/login', function (res) {
      return router.render('login', '/spa/login')
    }),
  ]
})

// preload(function (loadPage) {
//   loadPage('login', '/spa/login')
// })
