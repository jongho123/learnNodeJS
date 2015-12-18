var http = require('http');
var async = require('async');
var redis = require('redis');
var jade = require('jade');

// jade 템플릿 구성
var layout = require('fs').readFileSync( __dirname + '/score.jade', 'utf8');
var fn = jade.compile(layout, {filename: __dirname + '/score.jade'});

// Redis 클라이언트 시작
var client = redis.createClient();

// 5번째 데이터 베이스 선택
client.select(5);

// 도우미 함수
function makeCallbackFunc(member) {
  return function(callback) {
    client.hgetall(member, function(err, obj) {
      callback(err, obj);
    }); 
  }
}

http.createServer( function(req, res) {
  // 먼저 아이콘 요청을 필터링
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'});
    res.end();
    return;
  }

  // 상위 5명에 대해 점수를 역순으로 가져옴
  client.zrevrange('Zowie!', 0, 4, function(err, result) {
    var scores;
    if (err) {
      console.log(err);
      res.end('Top scores not currently available, please check back');
      return ;
    }

    // Async.series 호출에 대한 콜백 함수 배열을 생성
    var callFunctions = [];
  
    // makeCallbackFunc으로 결과를 처리하고
    // 새롭게 변환된 콜백을 배열에 push
    for (var i = 0; i < result.length; i++) {
      callFunctions.push( makeCallbackFunc(result[i]) );
    }

    // Async series를 사용하여 각 콜백을 순차적으로 처리하고
    // 최종 결과를 개체 배열로 반환
    async.series(
      callFunctions,
      function (err, result) {
        if (err) {
          console.log(err);
          res.end('Scores not available');
          return ;
        }

        // 템플릿 엔진에게 개체 배열 전달
        var str = fn({scores : result});
        res.end(str);
      }
    );
  });
}).listen(19918);

console.log('score Server running on 19918/');
