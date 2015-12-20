var net = require('net');

var server = net.createServer(function(conn) {
  console.log('connected');

  conn.on('data', function (data) {
    console.log('come in ' + data + ' from ' + conn.remoteAddress + ' ' + conn.remotePort);
    conn.write('repeating: ' + data);
  });
 
  conn.on('close', function() {
    console.log('client closed connection');
  });
}).listen(19918);

console.log('listening on port 19918');

