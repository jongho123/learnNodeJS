var connect = require('connect'),
    morgan = require('morgan'),
    favicon = require('serve-favicon');
var http = require('http');

var app = connect()
         .use(favicon(__dirname + '/favicon.ico'))
         .use(morgan('combined'))
         .use(function(req, res) {
           res.end('Hello world\n');
         });

http.createServer(app).listen(19918);
