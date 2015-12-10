var fs = require('fs');

var writeStream = fs.createWriteStream('./log.txt',
  {'flags': 'a',
   'encoding': 'utf8',
   'mode': 0666});

try {
  // 파일의 목록을 가져옴
  fs.readdir('./data/', function(err, files) {
    // 각 파일에 대해
    files.forEach(function(name) {
      fs.stat('./data/' + name, function(err, stats) {
        if(err) throw err;
 
        if(stats.isFile())
          fs.readFile('./data/' + name, 'utf8', function(err, data) {
            if(err) throw err;
            var adjData = data.replace(/somecompany\.com/g, 'burningbird.net');

            fs.writeFile('./data/' + name, adjData, function(err) {
              if(err) throw err;
              writeStream.write('change ' + name + '\n', 'utf8', function(err) {
                if(err) throw err;
              });
            });
          });
      });
    }); 
  });
} catch(err) {
  console.error(err);
}
