var fs = require('fs')
    https = require('https');

var privateKey = fs.readFileSync('site.key').toString();
var certificate = fs.readFileSync('final.crt').toString();

var options = {
  key: privateKey,
  cert: certificate
};

https.createServer(options, function(req, res) {
  res.writeHead(200);
  res.end('hello secure world');
}).listen(19917);

console.log('server listening port 19917');
