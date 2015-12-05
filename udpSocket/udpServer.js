var dgram = require('dgram');

var server = dgram.createSocket('udp4');

// 메세지 이벤트(접속) 이 오면 화면에 출력.
server.on( 'message', function(msg, rinfo) {
  console.log("Message: " + msg + " from " + rinfo.address + " : " + rinfo.port);
});

server.bind(19918);
