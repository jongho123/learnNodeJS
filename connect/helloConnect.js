var connect = require('connect'),
    morgan = require('morgan'),
    favicon = require('serve-favicon'),
    serveStatic = require('serve-static');

var http = require('http'),
    fs = require('fs');

var writeStream = fs.createWriteStream('./log.txt',
      {'flags': 'a',
       'encoding': 'utf8',
       'mode':0666});

var app = connect()
         .use(favicon(__dirname + '/favicon.ico'))
         .use(morgan('dev', {stream: writeStream}))
         .use(serveStatic(__dirname + '/static', {index: 'public.html'}));

http.createServer(app).listen(19918);
