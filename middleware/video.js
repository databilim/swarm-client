const file = require('../model/Video.js');


module.exports = (req,res,next)=>{

        const promise = file.find({});

            promise.then((data)=>{

                req.video = data
             // console.log(data)
              next()
            }).catch((err) => {
                console.log(err)
            })
}


