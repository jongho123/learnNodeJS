var mongoose = require('mongoose'),
    crypto = require('crypto');
var User = require('./models/user.js');

// MongoDB
mongoose.connect('mongodb://localhost/userDB');

mongoose.connection.on('open', function() {
  console.log('Connected to Mongoose');
});

var username = process.argv[2];
var password = process.argv[3];

var salt = Math.round((new Date().valueOf() * Math.random())) + '';

var hashpassword = crypto.createHash('sha512')
                   .update(salt + password)
                   .digest('hex');

var user = {
  username: username,
  password: hashpassword,
  salt: salt 
};

var userObj = new User(user);

userObj.save(function(err, data) {
  if (err) return console.log(err);
  console.log(data);
});
