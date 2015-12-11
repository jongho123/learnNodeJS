var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    mime = require('mime'),
    base = './static/public.html';

http.createServer( function(req, res) {
  pathname = base;
  console.log(pathname);

  fs.stat(pathname, function(err, stats) {
    if(err) {
      res.writeHead(404);
      res.write('Bad request 404\n');
      res.end();
    } else if(stats.isFile()) {
      // content type
      var type = mime.lookup(pathname);
      console.log(type);
      res.writeHead(200, {'Content-Type': type});
      
      // 읽기 가능 스트림을 생성하고 pipe 시킴
      var file = fs.createReadStream(pathname);
      file.on('open', function(err) {
        file.pipe(res);
      });
      file.on('error', function(err) {
        console.log(err);
      }); 
    } else {
      res.writeHead(403);
      res.write('Directory access is forbidden');
      res.end();
    }
  });
}).listen(19918);
console.log('Server running at 19918/');

