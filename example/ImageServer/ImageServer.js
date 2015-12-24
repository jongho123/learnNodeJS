var express = require('express'),
    http = require('http'),
    app = express();

var serveStatic = require('serve-static'),
    multer = require('multer'),
    upload = multer({dest: 'uploads/'});

var spawn = require('child_process').spawn,
    fs = require('fs');

var canvas = require('./canvas');

function processImage(res, path) {
  // 사진을 가져옴
  var photo = __dirname + '/' + path;

  // 배열로 변환
  var opts = [
    photo,
    '-resize', '150',
    '-bordercolor', 'snow',
    '-border', '6',
    '-background', 'grey60',
    '-background', 'none', '-rotate', '6',
    '-background', 'black', 
    '(', '+clone', '-shadow', '60x4+4+4', ')',
    '+swap',
    '-background', 'none',
    '-flatten',
    photo + '.png'
  ];

  console.log(opts);
  // 변환
  var im = spawn('convert', opts);

  im.stderr.on('data', function(code) {
    console.log('stderr: ' + code);
  });
  
  im.on('exit', function(code) {
    if (code === 0) {
      var convertedImage = fs.createReadStream(photo + '.png');
      convertedImage.pipe(res);
      convertedImage.on('end', function() {
        res.end();
        console.log('send png');
      });
    }
  });
}

app.use(serveStatic('static', {index: 'upload.html'}));
app.get('/graphic', function(req, res) {
  canvas.createGraphic(res);
});
app.post('/', upload.single('imagefile'), function(req, res) {
  if(req.file && req.file.mimetype === 'image/jpeg') {
    processImage(res, req.file.path);
  } else {
    res.end('The file you uploaded was not a jpg');
  }
});

http.createServer(app).listen(19918);

console.log('server listening port 19918');
