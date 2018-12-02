var express = require('express');


var https = require('https');
//var http = require('http');
const fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
const db = require('./helper/db.js')();
// ROUTERS
var swarms = require('./routes/swarm');
var index = require('./routes/index');


//MİDDLEWARE 
const  video = require("./middleware/video");

var app = express();



server = require('http').createServer(app),
io = require('socket.io').listen(server);
server.listen(3000);

//https.createServer(options, app).listen(443);

io.on('connection', socket => {
  console.log('User connected')
 
  socket.emit("video play",1)


  socket.on('disconnect', () => {
    console.log('user disconnected')

  })



  const VideoCount = require("./model/VideoCount")
  const Video = require("./model/Video")
  var videoCek = Video.find()
  var countVideo = VideoCount.findOne({}); 

  socket.on("video start",(data)=>{
      videoCek.then((videoData)=>{
        var videoToplam = videoData.length;

        
        videoData.videoToplam = videoToplam -1; 
        return videoData
        
      }).then((data)=>{
            
            countVideo.then((sayx)=>{
              data.say = sayx.say
              

              return data
            }).then((data)=>{

               if(data.videoToplam == data.say || data.videoToplam < data.say){
                  VideoCount.update({},{$set:{say: 0 }},{ multi: true },(s,d)=>{
                    console.log("Video Değeri Sıfırlandı")
                  })
                  io.emit("video onay",data[data.say])   
               }else{
                VideoCount.update({},{$set:{say: data.say +1 }},{ multi: true },(s,d)=>{
                  console.log("+1 Eklendi")
                }) 
                io.emit("video onay",data[data.say]) 
                console.log(data)
               }

            })
       

      })


})





})





app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//const server = http.createServer(app)
app.use (function (req, res, next) {
           // request was via https, so do no special handling
          req.io = io;
          //req.video = video;
          
          next();
  
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Set up express server here
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

 



app.use(video); 
app.use('/', index);

app.use("/social",swarms);





// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found BASKAN');
  err.status = 404;
  //console.log(err)
  next(err.status+" HATA SAYFA YOK YADA ULAŞILMIYOR");
});