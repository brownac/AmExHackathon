const mongoose = require('mongoose');

// connect to mongoose
mongoose.connect('mongodb://localhost/emberData');

var noteSchema = new mongoose.Schema({
	title: 'string',
	content: 'string',
	author: 'string'
});


module.exports.Note = mongoose.model('note', noteSchema);
