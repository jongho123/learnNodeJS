var spawn = require('child_process').spawn;

module.exports.processImage = function(path, filename) {
  // 사진을 가져옴
  var photo = process.argv[2];

  // 배열로 변환
  var opts = [
    photo,
    '-resize',
    '150',
    photo + '.png'
  ];

  // 변환
  var im = spawn('convert', opts);

  im.stderr.on('data', function(code) {
    console.log('stderr: ' + data);
  });
  
  im.on('exit', function(code) {
    if (code === 0)
      console.log('photo has been converted and is accessible at ' + photo + '.png');
  });
});
