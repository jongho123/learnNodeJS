var spawn = require('child_process').spawn,
    find = spawn('find', ['.', '-ls']),
    grep = spawn('grep', ['test']);

find.stderr.setEncoding('utf8');
grep.stdout.setEncoding('utf8');

// 찾은 결과를 grep으로 전달
find.stdout.on('data', function(data) {
  grep.stdin.write(data);
});

// grep을 실행해서 결과를 출력
grep.stdout.on('data', function (data) {
  console.log(data);
});

// 양쪽에 대한 오류 처리
find.stderr.on('data', function (data) {
  console.log(data);
});
grep.stderr.on('data', function (data) {
  console.log('grep stderr: ' + data);
});

// 양쪽에 대한 종료 처리
find.on('close', function (code) {
  if (code !== 0) {
    console.log('find process exited with code ' + code);
  }
  grep.stdin.end();
});

grep.on('exit', function (code) {
  if (code !== 0) {
    console.log('grep process exit with code ' + code);
  }
});

