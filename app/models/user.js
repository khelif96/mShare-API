var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var userSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  fb_app_id: String,
  api_token: String,
  password_hash: String,
  email: String,
  mailingList: {type: Boolean, default: true}, // Subscribed To Mailing List
  createdDate: {type: Date, default:Date.now},
  birthDate: {
    month: Number,
    day: Number,
    year: Number
  },
  notes: []
});

module.exports = mongoose.model('User',userSchema);
