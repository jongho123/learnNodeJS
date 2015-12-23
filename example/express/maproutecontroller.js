exports.mapRoute = function(app, prefix) {
  prefix = '/' + prefix;

  var prefixObj = require('./controllers/' + prefix);
  
  // 색인
  app.get(prefix, prefixObj.index);

  // 추가
  app.get(prefix + '/new', prefixObj.new);

  // 조회
  app.get(prefix + '/:sn', prefixObj.show);

  // 생성
  app.post(prefix + '/create', prefixObj.create);

  // 편집
  app.get(prefix + '/:sn/edit', prefixObj.edit);

  // 업데이트
  app.put(prefix + '/:sn', prefixObj.update);

  // 제거
  app.delete(prefix + '/:sn', prefixObj.destroy);
};
