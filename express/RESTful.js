var express = require('express'),
    http = require('http'),
    app = express();

var favicon = require('serve-favicon'),
    serveStatic = require('serve-static'),
    logger = require('morgan'),
    bodyParser = require('body-parser');

app.use(favicon('favicon.ico'));
app.use(logger('dev'));
app.use(serveStatic('static', { index: 'public.html' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var widgets = [
  { id : 1,
    name : 'My Special Widget',
    price : 100.00,
    descr : 'A widget beyond price'
  }
]

// 위젯 추가
app.post('/widgets/add', function(req, res) {
  var indx = widgets.length + 1;
  widgets[widgets.length] = 
    { id : indx,
      name : req.body.widgetname,
      price : parseFloat(req.body.widgetprice),
      descr : req.body.widgetdesc };
  console.log('added ' + widgets[indx-1]);
  res.send('Widget ' + req.body.widgetname + ' added with id ' + indx);
});

// 위젯 조회
app.get('/widgets/:id', function(req, res) {
  var indx = parseInt(req.params.id) - 1;
  if (!widgets[indx])
    res.send('Widget ' + req.body.widgetname + ' added with id ' + indx);
  else
    res.send(widgets[indx]);
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
      message: err.message,
      error: err
    });
  });
}

http.createServer(app).listen(19918);

console.log('Express server listening on port 19918');
