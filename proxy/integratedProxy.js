var connect = require('connect'),
    http = require('http'),
    fs = require('fs'),
    crossroads = require('crossroads'),
    httpProxy = require('http-proxy');

var favicon = require('serve-favicon'),
    morgan = require('morgan'),
    serveStatic = require('serve-static');

// 프록시 생성
var proxy = httpProxy.createProxyServer();

// 동적 리소스에 대한 요청을 위한 라우팅 경로 추가
crossroads.addRoute('/node/{id}/', function(id) {
  console.log('accessed node ' + id);
});

// 모든 요청을 수신 대기하는 프록시 서버
http.createServer(function(req, res) {
  if (req.url.match(/^\/node\//))
    proxy.web(req, res, {target: 'http://localhost:8080'});
  else
    proxy.web(req, res, {target: 'http://localhost:8081'});
}).listen(19918)
// 동적 파일 서버
http.createServer(function(req, res) {
  crossroads.parse(req.url);
  res.end('that\'s all!');
}).listen(8080);

// 정적 파일 서버
http.createServer(connect().use(favicon(__dirname + '/favicon.ico'))
                           .use(morgan('dev'))
                           .use(serveStatic(__dirname + '/static', {index:'public.html'}))
).listen(8081);
