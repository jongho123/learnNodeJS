var mongoose = require('mongoose'),
    crypto = require('crypto');
var Widget = require('./models/user.js');

// MongoDB
mongoose.connect('mongodb://localhost/userDB');

mongoose.connection.on('open', function() {
  console.log('Connected to mongoose');
});

var username = process.argv[2];
var password = process.argv[3];

Widget.find({username: username}, function(err, users) {
  if (err) return console.log(err);
  else if (users) return console.log('not find users');
  
  var newhash = crypto.createHash('sha512')
                .update(users[0].salt + password)
                .digest('hex');

  if (users[0].password === newhash) {
    console.log('OK, you\'re cool');
  } else {
    console.log('Your password is wrong. Try again.');
  }
});
