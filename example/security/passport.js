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
    LocalStrategy = require('passport-local'),
    crypto = require('crypto');


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
  console.log('Authenticate !!! : ' + req.isAuthenticated());
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

passport.use(new LocalStrategy( function(username, password, done) {
  User.find({username: username}, function(err, users) {
    if (err) return console.log(err);
    else if (users.length == 0) return done(null, false, {message: 'Unknown user ' + username}); 

    var newhash = crypto.createHash('sha512')
                  .update(users[0].salt + password)
                  .digest('hex');
  
    console.log(users[0].password);
    console.log(newhash);
    if (users[0].password === newhash) {
      var user = {id: users[0]._id,
                  username: username,
                  password: newhash};
      return done(null, user);
    } else {
      return done(null, false, { message: 'Invalid password' });
    }  
  });
}));

// 사용자를 세션으로 직렬화
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// DB에서 사용자를 찾음
passport.deserializeUser(function(id, done) {
  User.findOne({_id: id}, function(err, user) {
    done(err, user);
  });
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
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(require('flash')());
app.use(serveStatic('.'));

app.get('/', function(req, res) {
  res.render('index', { title: 'authenticate', username: req.user});
});
app.get('/admin', ensureAuthenticated, function(req, res) {
  res.render('index', { title: 'admin authenticate', username: req.user.username});
});
app.get('/login', function(req, res) {
  var username = req.user? req.user.username : '';
  res.render('index', { title: 'authenticate', username: username,
                        message: req.flash('error') });
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
  res.redirect('/admin');
});

http.createServer(app).listen(19917);

console.log('Express server listening on port 19917');
