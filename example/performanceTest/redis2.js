var redis = require('redis'),
    http = require('http');

var scoreServer = http.createServer();

// 들어오는 요청을 수신
scoreServer.on('request', function(req, res) {
  console.time('test');

  // Redis 클라이언트 생성
  var client = redis.createClient();

  client.on('error', function(err) {
    console.log('Error ' + err);
  });

  // 데이터베이스를 1로 설정
  client.select(1);

  req.addListener('data', function(chunk) {
    console.log('data: ' + chunk);
  });

  req.addListener('end', function() {
    if(req.url != '/') {
      return ;
    }
    var obj = {
      member : 2366,
      game : 'debiggame',
      first_name : 'Larry',
      last_name : 'Lim',
      email : 'larry@lim.com',
      score : 50000
    };

    // 점수를 추가하거나 덮어 씀
    client.hset(obj.member, 'game', obj.game);
    client.hset(obj.member, 'first_name', obj.first_name);
    client.hset(obj.member, 'last_name', obj.last_name);
    client.hset(obj.member, 'email', obj.email);
    client.hset(obj.member, 'score', obj.score);

    client.hvals(obj.member, function(err, replies) {
      if (err) {
        return console.error('error response - ' + err);
      }
      /*
      console.log(replies.length + ' replies:');
      replies.forEach(function (reply, i) {
        console.log('   ' + i + ': ' + reply);
      });
      */
    });
  
    res.end(obj.member + ' set score of ' + obj.score);
    client.quit();
    console.timeEnd('test');
  }); 
});

scoreServer.listen(19916);

console.log('listening on 19917');
