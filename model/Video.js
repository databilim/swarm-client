const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const VideoSchema = new Schema({
	file: {
		type: String,
		            
    },
    description: {
		type: String,
		            
    },
    title: {
		type: String,
		            
	},
	type: {
		type: String,
		
	}
});

module.exports = mongoose.model('video', VideoSchema);