
const mongoose = require('mongoose');

module.exports = () => {
   
  mongoose.connect(' mongodb://swarm-api:Cx9544Cx@ds039321.mlab.com:39321/swarm-api', { useNewUrlParser: true});
 
  mongoose.connection.on('open', () => {
     console.log('MongoDB: Connected');
  });
  mongoose.connection.on('error', (err) => {
    console.log('MongoDB: Error', err);
  });

  mongoose.Promise = global.Promise;
};


