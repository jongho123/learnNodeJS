var Canvas = require('canvas');
  
module.exports.createGraphic = function(res) {
  // 새로운 canvas와 컨텍스트
  var canvas = new Canvas(350, 350);
  var ctx = canvas.getContext('2d');
  
  // 색이 칠해지고 그림자를 가진 사각형을 생성
  // 이후 복원을 위해 컨텍스트를 저장
  ctx.save();
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.shadowBlur = 5;
  ctx.shadowColor='rgba(0, 0, 0, 0.4)';
  
  ctx.fillStyle = '#fff';
  ctx.fillRect(30, 30, 300, 300);
  
  // 그림자 그리기
  ctx.restore();
  ctx.strokeRect(30, 30, 300, 300);
  
  // MDN 예제: 위에서 만든 사각형 안에 옵셋을 준 후 예쁜 그래픽을 삽입
  ctx.translate(125, 125);
  for (i = 0; i < 6; i++) {
    ctx.save();
    ctx.fillStyle = 'rgb(' + (52 * i) + ',' + (255 - 51 * i) + ', 255)';
    for (j = 0; j < i * 6; j++) {
      ctx.rotate(Math.PI * 2 / (i * 6));
      ctx.beginPath();
      ctx.arc(0, i * 12.5, 5, 0, Math.PI * 2, true);
      ctx.fill();
    }
    ctx.restore();
  }

  var stream = canvas.createPNGStream();
  stream.on('data', function(chunk) {
    res.write(chunk);
  });
  stream.on('end', function(chunk) {
    res.end();
    console.log('send png');
  });
} 
  
