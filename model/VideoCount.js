const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const VideoCountSchema = new Schema({
	say: {
		type: Number,
		            
    }
});

module.exports = mongoose.model('videoCount', VideoCountSchema);