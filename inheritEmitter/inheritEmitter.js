var util = require('util');
var eventEmitter = require('events').EventEmitter;

var fs = require('fs');

function inputChecker (name, file) {
  this.name = name;
  this.writeStream = fs.createWriteStream('./' + file + '.txt' ,
    {'flags' : 'a',
     'encoding' : 'utf8',
     'mode' : 0666});
};

util.inherits(inputChecker, eventEmitter);

inputChecker.prototype.check = function check(input) {
  var command = input.toString().trim().substr(0,3);
  if (command == 'wr:') {
    this.emit('write', input.substr(3, input.length));
  } else if (command == 'en:') {
    this.emit('end');
  } else {
    this.emit('echo', input);
  }
};

var ic = new inputChecker('Jongho', 'output');

ic.on('write', function(data) {
  // write 스트림에다가 씀.
  this.writeStream.write(data, 'utf8');
});

ic.on('echo', function(data) {
  console.log(this.name + ' wrote ' + data);
});

ic.on('end', function() {
  // 프로세스 종료
  process.exit();
});

// stdin 설정
process.stdin.resume();
process.stdin.setEncoding('utf8');

// stdin으로 입력받아 ic.check로 확인함.
process.stdin.on('data', function(input) {
  ic.check(input);
});
