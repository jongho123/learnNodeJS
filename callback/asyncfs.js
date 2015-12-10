var fs = require('fs');

try {
  // 파일 읽음.
  fs.readFile('./apples.txt', 'utf8', function(err, data) {
    if(err) throw err;

    // 내용 수정 'apple', 'Apple' -> 'orange'
    var adjData = data.replace(/[A|a]pple/g, 'orange');
    
    // 변경된 내용을 oranges.txt 에 씀
    fs.writeFile('./oranges.txt', adjData, function(err) {
      if(err) throw err;
    });
  });
} catch(err) {
  console.error(err);
}
