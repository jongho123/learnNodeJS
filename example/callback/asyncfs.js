var fs = require('fs'),
    async = require('async');

try {
  async.waterfall([
    // 파일 읽음.
    function readData(callback) {
      fs.readFile('./data/data1.txt', 'utf8', function(err, data) {
        callback(err, data);
      });
    },
    // 내용 수정 'somecompany.com' -> 'burningbird.net'
    function modify(text, callback) {
      var adjData = text.replace(/somecompany\.com/g, 'burningbird.net');
      callback(null, adjData);
    },
    // 변경된 내용을 덮어 씀
    function writeData(text, callback) {
      fs.writeFile('./data/data1.txt', text, function(err) {
        callback(err, text);
      });
    }
    // 결과 출력
  ], function(err, result) {
       if(err) throw err;
       console.log(result);
  });
} catch(err) {
  console.error(err);
}
