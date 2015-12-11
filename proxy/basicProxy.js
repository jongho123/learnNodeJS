var http = require('http'),
    httpProxy = require('http-proxy');

httpProxy.createServer(8080, 'localhost').listen(19918);

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
  req.end();
}).listen(8080);
