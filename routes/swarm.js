var express = require('express');
var router = express.Router();
const fs = require('fs');
const Swarm = require("../model/Swarm");

router.get('/swarm',(req,res,next)=>{


    res.send("BURASI SAYFA ")
  
  })

router.post('/swarm',(req,res,next)=>{
    const json = JSON.parse(req.body.checkin);
  
    res.send(req.body)

     req.io.emit("checkin",req.body.checkin)
    
     const swEkle = Swarm({
            swUserId    : json.user.id,
            swUser      : req.body.checkin,
            swHit       : 0,
            swName      : json.user.firstName,
            swSurName   : json.user.lastName,
            swGender    : json.user.gender
                    })
        const promise = swEkle.save();


  })
 


module.exports = router;