var http = require("http");

function onRequest( request, response ) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write( "Hello World" );
  response.end();

  console.log("send hello world");
}

http.createServer( onRequest ).listen(19917);

console.log("Server running on 19917");
