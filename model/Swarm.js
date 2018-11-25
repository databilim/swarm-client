const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const SwarmSchema = new Schema({
	swUserId: {
		type: String,
		            
		},
	swName:{
		type:String
	},
	swSurName:{
		type:String
	}	,
	swGender:{
		type:String
	},
	swUser:{
		type:String,
	}	,
  swHit: {
		type: Number,
		            
		},
	tarih: {
		type: Date,
		default:Date.now
	}	
  
	});

module.exports = mongoose.model('swarmCheckin', SwarmSchema);