var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

// Image Note Schema
var imageNoteSchema = new Schema({
  Title: String,
  Content: String,
  imageUrl: String,
  author_id: String,
  NoteType: {type: String, default: "image"},
  is_public: {type: Boolean, default: false},
  access_ids: [],
  createdDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('imageNote', imageNoteSchema);
