// http 모듈 로드
var http = require("http");
var fs = require('fs');

//http 서버 생성
http.createServer(function (req, res) {
  // helloworld.js를 열고 읽음
  fs.readFile('helloworld.js', 'utf8', function (err, data) {

    res.writeHead(200, {'Content-Type': 'text/plain'});
    if (err)
      res.write('Could not find or open file for reading\n');
    else
      // 오류가 없다면 js파일을 클라이언트에게 보냄
      res.write(data);

    res.end();
  });
}).listen(19918, function() { console.log('bound to port 19918') });

console.log("Server running on 19918/");
