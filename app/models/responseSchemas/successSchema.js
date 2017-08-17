var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var successSchema = new Schema({
  _id: {default:0},
  success: {type:Boolean, default: true},
  payload:{
    message: String,
    data: {}
  },
  status: Number
});

module.exports = mongoose.model('Success',successSchema);
