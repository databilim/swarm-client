var express = require('express');
var router = express.Router();
const fs = require('fs');
const Video = require("../model/Video")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { video: req.video , swarm:req.checkin});

  
  
});

router.get('/api/video',(req,res,next)=>{

  
  //res.send(req.body)
  
  const promise = Video.find()
   //req.io.emit("checkin",req.body.checkin)
   promise.then((video)=>{

    res.json(video)
      }).catch((err)=>{

          res.json({error:err, code:5})
      })
})



router.get('/video/:video_id', function(req, res) {
  
  const promise = Video.findById(req.params.video_id);
    promise.then((data) => {
      
    if(data.type=="video"){
          const path = './public/upload/video/'+data.file;
          const stat = fs.statSync(path)
          const fileSize = stat.size
          const range = req.headers.range
          if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1] 
              ? parseInt(parts[1], 10)
              : fileSize-1
            const chunksize = (end-start)+1
            const file = fs.createReadStream(path, {start, end})
            const head = {
              'Content-Range': `bytes ${start}-${end}/${fileSize}`,
              'Accept-Ranges': 'bytes',
              'Content-Length': chunksize,
              'Content-Type': 'video/mp4',
            }
            res.writeHead(206, head);
            file.pipe(res);
          } else {
            const head = {
              'Content-Length': fileSize,
              'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head)
            fs.createReadStream(path).pipe(res)
          } 

    }
   

    }).catch((err) => {
      res.json(err);
    })


});



module.exports = router;
