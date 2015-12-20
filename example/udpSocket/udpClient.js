var dgram = require('dgram');

var client = dgram.createSocket('udp4');

// 터미널로부터 입력 준비
process.stdin.resume();

process.stdin.on('data', function (data) {
  console.log(data.toString('utf8'));
  client.send(data, 0, data.length, 19918, "localhost", function(err, bytes) {
    if (err)
      console.log('error: ' + err);
    else
      console.log('successful');
  });
});
