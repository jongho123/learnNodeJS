var redis = require('redis');
module.exports = function getStats() {
  return function getStats(req, res, next) {
    //Redis 클라이언트 생성
    var client = redis.createClient();
    client.on('error', function (err) {
      console.log('Error ' + err);
    });

    // 데이터베이스를 2로 설정
    client.select(2);
  
    // IP 추가
    client.sadd('ip', req.socket.remoteAddress); 

    // 리소스 카운트 증가
    client.hincrby('myurls', req.url, 1);

    client.quit();
    next();
  }
}
