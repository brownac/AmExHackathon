const mongoose = require('mongoose');

// connect to mongoose
mongoose.connect('mongodb://localhost/emberData');

var noteSchema = new mongoose.Schema({
	title: 'string',
	content: 'string',
	author: 'string'
});


module.exports.Note = mongoose.model('note', noteSchema);

module.exports.createOne = () => {
  let note = new module.exports.Note({
    title: "A Note",
    content: "The note has some cool content",
    author: "Drake"
  });

  note.save();
}

