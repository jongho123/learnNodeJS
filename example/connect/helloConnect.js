var connect = require('connect'),
    morgan = require('morgan'),
    favicon = require('serve-favicon'),
    serveStatic = require('serve-static'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session');

var http = require('http'),
    fs = require('fs');

var writeStream = fs.createWriteStream('./log.txt',
      {'flags': 'a',
       'encoding': 'utf8',
       'mode':0666});

// 모든 세션 데이터를 지움
function clearSession(req, res, next) {
  if('/clear' == req.url) {
    req.session = null;
    res.writeHead(302, {'Location': '/'});
    res.end();
  } else {
    next();
  }
}

// 사용자 추적
function trackUser(req, res, next) {
  req.session.ct = req.session.ct || 0;
  req.session.username = req.session.username || req.cookies.username;
  console.log(req.cookies.username + ' requested '
              + req.session.ct++ + ' resources this session');
  next();
}

var app = connect()
         .use(favicon(__dirname + '/favicon.ico'))
         .use(morgan('dev', {stream: writeStream}))
         .use(cookieParser())
         .use(cookieSession({keys : 'tracking' }))
         .use(clearSession)
         .use(trackUser)
         .use(serveStatic(__dirname + '/static', {index: 'public.html'}));

http.createServer(app).listen(19918);
