const mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
	title: 'string',
	content: 'string',
	author: 'string'
});

module.exports.Note = mongoose.model('note', noteSchema);

