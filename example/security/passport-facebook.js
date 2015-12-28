var express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    app = express();

var favicon = require('serve-favicon'),
    serveStatic = require('serve-static'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook');


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var User = require('./models/user.js');

// MongoDB
mongoose.connect('mongodb://localhost/userDB');

mongoose.connection.on('open', function() {
  console.log('Connected to Mongoose');
});

// 사용자 인증 확인
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth');
}

passport.use(new FacebookStrategy({
  clientID: 'your app id',
  clientSecret: 'your key',
  callbackURL: 'http://yourhost/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    done(null, profile);
  }
));

// 사용자 정보를 세션에 저장
passport.serializeUser(function(user, done) {
  console.log('serialize');
  done(null, user);
});

// 인증 후, 사용자 정보를 세션에서 찾아서 user에 저장
passport.deserializeUser(function(user, done) {
  console.log('deserialize');
  done(null, user);
});

// 미들웨어 추가
app.use(favicon('favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res) {
  // custom logic
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(require('flash')());
app.use(serveStatic('.'));

app.get('/', function(req, res) {
  res.render('index', { title: 'authenticate', message: req.user});
});
app.get('/admin', ensureAuthenticated, function(req, res) {
  res.render('index', { title: 'admin authenticate', message: JSON.stringify(req.user)});
});
app.get('/auth', function(req, res) {
  res.render('auth', { title: 'authenticate' });
});
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', 
        passport.authenticate('facebook', { failureRedirect: '/auth' }),
        function(req, res) {
          res.redirect('/admin');
        }
);
http.createServer(app).listen(19917);

console.log('Express server listening on port 19917');
