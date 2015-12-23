var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// Widget 모델 생성
var Widget = new Schema({
  sn: {type: String, required: true, trim: true, unique: true},
  name: {type: String, required: true, trim: true},
  desc: String,
  price: Number 
});

module.exports = mongoose.model('Widget', Widget);
