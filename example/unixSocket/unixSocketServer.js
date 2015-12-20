// 서버와 콜백함수 생성
var http = require('http');
var fs = require('fs');

// 종료하면 /tmp/node-server-sock 파일을 지워줘야
// 다시 동작할 수 있음.
http.createServer(function (req,res) {
  var query = require('url').parse(req.url).query;
  console.log(query);

  file = require('querystring').parse(query).file;
 
  // 컨텐츠 헤더
  res.writeHead(200, {'Content-Type': 'text/plain'});

  // 전역으로 증가시키면서 클라이언트에 쓴다.
  for (var i = 0; i < 100; i++) {
    res.write(i + '\n');
  }

  // 파일 컨텐츠를 열어서 읽음
  var data = fs.readFileSync(file, 'utf8');
  res.write(data);
  res.end()
}).listen('/tmp/node-server-sock');
