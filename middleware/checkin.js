const swarm = require('../model/Swarm.js');


module.exports = (req,res,next)=>{

        const promise = swarm.countDocuments({},(s,d)=>{

            console.log("TOLAM CHECKİN "+d)
            req.checkin = d;
            next();
        });

             
}
