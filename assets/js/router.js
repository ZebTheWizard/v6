
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

