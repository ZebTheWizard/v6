
loader(function (load) {
  load('login', '/spa/login')
  load('today', '/spa/today', { date: today()})
  load('games', '/spa/games')
  load('apps', '/spa/apps')
  load('updates', '/spa/updates')
  load('search', '/spa/search')
})

router(function (router, queue) {
  return [
    router.route('/', function (res) {
      return router.render('today', '/spa/today', { date: today()})
    }),
    router.route('/games', function (res) {
      return router.render('games', '/spa/games')
    }),
    router.route('/apps', function (res) {
      return router.render('apps', '/spa/apps')
    }),
    router.route('/updates', function (res) {
      return router.render('updates', '/spa/updates')
    }),
    router.route('/search', function (res) {
      return router.render('search', '/spa/search')
    }),
    router.route('/login', function (res) {
      return router.render('login', '/spa/login')
    }),
  ]
})

// preload(function (loadPage) {
//   loadPage('login', '/spa/login')
// })
