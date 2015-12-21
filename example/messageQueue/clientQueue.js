var spawn = require('child_process').spawn;
var net = require('net');

var client = new net.Socket();
client.setEncoding('utf8');

// TCP 서버에 연결
client.connect ('3000', 'localhost', function() {
  console.log('connected to server');
});

// 자식 프로세스 시작
var logs = spawn('tail', ['-f', './access.log']);

// 자식 프로세스 데이터 처리
logs.stdout.setEncoding('utf8');
logs.stdout.on('data', function(data) {
  console.log('data: ' + data);
  // 리소스 URL
  var re = /GET\s(\S+)\sHTTP/g;
  
  // 이미지 테스트
  var re2 = /\.gif|\.png|\.jpg|\.svg/;

  // URL을 추출하여 이미지인지 검사
  // 이미지가 발견되면 Redis에 저장
  var parts = re.exec(data);
  var tst = re2.test(parts[1]);

  console.log('parts: ' + parts);
  console.log('tst: ' + tst);
  if (tst) {
    client.write(parts[1]);
  }
});

logs.stderr.on('data', function(data) {
  console.log('stderr: ' + data);
});

logs.on('exit', function(code) {
  console.log('child process exited with code ' + code);
  client.end();
});

