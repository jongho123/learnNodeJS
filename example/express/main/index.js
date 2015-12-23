var redis = require('redis');

exports.index = function(req, res) {
  res.render('index', { title: 'Widget Factory' });
};

// 통계
exports.stats = function(req, res) {
  var client = redis.createClient();

  client.select(2);

  // 데이터를 취합하기 위한 Redis 트랜잭션
  client.multi()
  .smembers('ip')
  .hgetall('myurls')
  .exec(function(err, result) {
    var ips = result[0];
    var urls = result[1];
    res.render('stats', { title: 'Stats', ips : ips, urls : urls });
    client.quit();
  });
}
