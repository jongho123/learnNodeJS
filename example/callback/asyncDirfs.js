var fs = require('fs'),
    async = require('async'),
    _dir = './data/';

var writeStream = fs.createWriteStream('./log.txt',
  {'flags': 'a',
   'encoding': 'utf8',
   'mode': 0666});

try {
  async.waterfall([
    // 파일의 목록을 가져옴
    function readDir(callback) {
      fs.readdir(_dir, function(err, files) {
        callback(err, files);
      });
    },
    // 각 파일에 대해
    function loopFiles(files, callback) {
      files.forEach(function(name) {
        callback(null, name);
      });
    },
    // file인지 체크 함.
    function checkFile(file, callback) {
      fs.stat(_dir + file, function(err, stats) {
        callback(err, stats, file);
      });
    },
    // 파일을 읽음.
    function readData(stats, file, callback) {
      if(stats.isFile())
        fs.readFile(_dir + file, 'utf8', function(err, data) {
          callback(err, file, data);
        });
    },
    // 내용을 수정.
    function modify(file, text, callback) {
      var adjData = text.replace(/somecompany\.com/g, 'burningbird.net');
      callback(null, file, adjData); 
    },
    // 수정된 내용을 저장
    function writeData(file, text, callback) {
      fs.writeFile(_dir + file, text, function(err) {  
        callback(err, file);
      });
    },
    // 수정된 파일 이름을 로그로 남김
    function logChange(file, callback) {
      writeStream.write('change ' + file + '\n', 'utf8', function(err) {
        callback(err, file);
      });
    }
    // 결과를 출력
  ], function(err, result) {
       if(err) throw err; 
       console.log(result);
  });
} catch(err) {
  console.error(err);
}
