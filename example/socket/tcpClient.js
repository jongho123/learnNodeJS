var net = require('net');

var client = new net.Socket();
client.setEncoding('utf8');

// 서버로 연결
client.connect ('19918', 'localhost', function() {
  console.log('connected to server');
  client.write('Who needs a browser to communicate?');
});

// 터미널로부터 입력을 준비
process.stdin.resume();

// 데이터를 입력받으면 서버로 전송
process.stdin.on('data', function (data) {
  client.write(data);
});

// 데이터를 수신하면 콘솔로 출력
client.on('data', function(data) {
  console.log(data);
});

// 서버가 닫히는 경우
client.on('close', function() {
  console.log('connection is closed');
});

client.on('error', function(){});
