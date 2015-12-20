var fs = require('fs');

try {
  // 동기로 파일을 읽음
  var data = fs.readFileSync('./apples.txt', 'utf8');
  console.log(data);

  // 읽은 파일 내용에 apple 혹은 Apple string을 orange로 변경
  var adjData = data.replace(/[A|a]pple/g, 'orange');

  // 변경된 내용을 oranges.txt 파일로 저장 
  fs.writeFileSync('./oranges.txt', adjData);
} catch(err) {
  console.error(err);
}

