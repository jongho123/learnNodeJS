var express = require('express'),
    main = require('./main'),
    map = require('./maproutecontroller'),
    stats = require('./stats'),
    http = require('http'),
    stylus = require('stylus'),
    mongoose = require('mongoose'),
    app = express();

// MongoDB
mongoose.connect('mongodb://localhost/WidgetDB');

mongoose.connection.on('open', function() {
  console.log('Connected to Mongoose');
});

var favicon = require('serve-favicon'),
    serveStatic = require('serve-static'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// 미들웨어 추가
app.use(stats());
app.use(favicon('favicon.ico'));
app.use(logger('dev'));
app.use(stylus.middleware({
  src: __dirname + '/views',
  dest: __dirname + '/static'
}));
app.use(serveStatic('static'));
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

app.get('/', main.index);
app.get('/stats', main.stats);

var prefixes = ['widgets'];

// 컨트롤러에 라우팅 경로를 매팅
prefixes.forEach(function(prefix) {
  map.mapRoute(app, prefix);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      title: 'error',
      message: err.message,
      error: err
    });
  });
}

http.createServer(app).listen(19918);

console.log('Express server listening on port 19918');
