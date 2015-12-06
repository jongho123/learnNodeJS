var readline = require('readline');

// 새 인터페이스 생성
var interface = readline.createInterface(process.stdin, process.stdout, null);

// 질문을 물어봄
interface.question('>>What is the meaning of life? ', function(answer) {
  console.log('About the meaning of life, you said ' + answer);
  interface.setPrompt('>>');
  interface.prompt();
});

// 인터페이스를 닫기 위한 함수
function closeInterface() {
  console.log('Leaving interface...');
  process.exit();
}

// .leave 수신 대기
interface.on('line', function(cmd) {
  if (cmd.trim() == '.leave') {
    closeInterface();
    return;
  } else {
    console.log('repeating command: ' + cmd);
  }
  interface.setPrompt('>>');
  interface.prompt();
});

interface.on('close', function() {
  closeInterface();
});
