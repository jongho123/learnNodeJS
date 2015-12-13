var express = require('express'),
    http = require('http'),
    app = express();

var favicon = require('serve-favicon'),
    serveStatic = require('serve-static'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

app.use(favicon('favicon.ico'));
app.use(logger('dev'));
app.use(serveStatic('static', { index: 'public2.html' }));
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

var widgets = [
  { id : 1,
    name : 'My Special Widget',
    price : 100.00,
    descr : 'A widget beyond price'
  }
]

// /widgets/에 대한 index
app.get('/widgets', function(req, res) {
  res.send(widgets);
});

// 위젯 조회
app.get('/widgets/:id', function(req, res) {
  var indx = parseInt(req.params.id) - 1;
  if (!widgets[indx])
    res.send('Widget ' + req.body.widgetname + ' added with id ' + indx);
  else
    res.send(widgets[indx]);
});

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

// 위젯 삭제
app.delete('/widgets/:id/delete', function(req, res) {
  var indx = req.params.id - 1;
  delete widgets[indx];
  console.log('deleted ' + req.params.id);
  res.send('deleted ' + req.params.id);
});

// 위젯 업데이트/편집
app.put('/widgets/:id/update', function(req, res) {
  var indx = parseInt(req.params.id) - 1;
  widgets[indx] = 
    { id : indx,
      name : req.body.widgetname,
      price : parseFloat(req.body.widgetprice),
      descr : req.body.widgetdesc };
  console.log(widgets[indx]);
  res.send('Updated ' + req.params.id);
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
