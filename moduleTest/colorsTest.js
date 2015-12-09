var colors = require('colors');

// 무지개 및 밑줄 효과
console.log('This Node kicks it!'.rainbow.underline);

// 얼룩무늬와 굵은체
console.log('We be nodin'.zebra.bold);

// 무지개 및 얼룩무늬
console.log('rainbow'.rainbow, 'zebra'.zebra);

colors.setTheme({
  mod1_warn: 'cyan',
  mod1_error: 'red',
  mod2_note: 'yellow',
});

console.log('This is a helpful message'.mod2_note);

console.log('This is a bad message'.mod1_error);
