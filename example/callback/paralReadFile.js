var fs = require('fs'),
    async = require('async');

var _dir = './data/';

try {
  // 병렬 처리
  async.parallel({
    // data1.txt를 읽음
    data1 : function (callback) {
      fs.readFile(_dir + 'data1.txt', 'utf8', function(err, data) {
        callback(err, data);
      });
    },
    // data2.txt를 읽음
    data2 : function (callback) {
      fs.readFile(_dir + 'data2.txt', 'utf8', function(err, data) {
        callback(err, data);
      });
    },
    // data3.txt를 읽음
    data3 : function (callback) {
      fs.readFile(_dir + 'data3.txt', 'utf8', function(err, data) {
        callback(err, data);
      });
    }
    // 결과 출력. JSON 으로 반환됨.
  }, function (err, result) {
    if(err) throw err;
    console.log(result);
  });
} catch(err) {
  console.log(err);
}
