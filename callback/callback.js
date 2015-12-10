var obj = function() {};

obj.prototype.doSomething = function(arg1, arg2_) {
  var arg2 = typeof(arg2_) === 'string'? arg2_ : null;
  
  var callback_ = arguments[arguments.length - 1];
  callback = (typeof(callback_) === 'function'? callback_ : null);

  if (!arg2)
    return callback(new Error('second argument missing or not a string'));

  callback(arg1);
}

var test = new obj();

try {

  // Error. does not exist second parameter 
  // test.doSomething('test', function(err, value) {

  // Error. second parameter is not string
  // test.doSomething('test', 3.55, function(err, value) {

  test.doSomething('test', 'test', function(err, value) {
    if (err) throw err;
    console.log(value);
  });
} catch(err) {
  // error를 받으면 에러 내용 출력
  console.error(err);
}
