var express = require('express'),
    routes = require('./routes'),
    map = require('./maproutecontroller'),
    http = require('http'),
    stylus = require('stylus'),
    app = express();

var favicon = require('serve-favicon'),
    serveStatic = require('serve-static'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

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

app.get('/', routes.index);
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
