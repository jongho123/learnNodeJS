var http = require('http'),
    httpProxy = require('http-proxy');

httpProxy.createProxyServer({target:'http://localhost:8080'}).listen(19918);

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(8080);
