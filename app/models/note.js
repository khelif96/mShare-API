var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

// Note Schema
var noteSchema = new Schema({
  Title: String,
  Content: String,
  author_id: String,
  noteType: {type:String,default:"text"},
  is_public: {type: Boolean, default: false},
  access_ids: [],
  createdDate: {type: Date, default:Date.now}
});

module.exports = mongoose.model('Note', noteSchema);
