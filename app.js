var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var ejs = require('ejs')

var app = express();
var config = require('./config');

var passport = require('passport')
const { User } = require('./models')

var mongoose = require('mongoose');
mongoose.connect(config.get('MONGODB_URI'), { useNewUrlParser: true });

app.locals = {
  title: config.get('title')
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
ejs.delimiter = '?'
app.set('view engine', 'ejs');


app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({
  secret: 'string that needs to be changed',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session())

app.use(function(req, res, next) {
  req.config = config
  next()
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, (err, user) => {
    done(err, user);
  })
});
// console.log(config.get('twitter.key'));

app.use('/', require('./auth/routes'))
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('*', function(req, res, next) {
  res.sendStatus(404)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
