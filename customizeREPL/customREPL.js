var repl = require("repl");

// 스타트 메서드 호출.
// 각 파라미터 기본값 : >, process.stdin, eval, false, false
// repl.start([prompt], [stream], [eval], [useGlobal], [ignoreUndefined]);

// null 로 설정하면 기본값으로 설정 됨.
repl.start("node via stdin> ", null, null, null, true);

