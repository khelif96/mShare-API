var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var errorSchema = new Schema({
  _id: {default:0},
  success: {type: Boolean, default: false},
  error: {
    status: Number,
    message: String
  }
});

module.exports = mongoose.model('Error',errorSchema);
