var express = require('express');
var router = express.Router();
const fs = require('fs');
var url = require('url');
router.get('/', function(req, res, next) {
    res.render('admin/index', { video: req.video , swarm:req.checkin,path: req.path});
      console.log("CELLO",req.url)
  });
  
router.get('/videoekle', function(req, res, next) {
    res.render('admin/index', { video: req.video , swarm:req.checkin,path: req.path});
    console.log("CELLO",req.originalUrl)
});

  module.exports = router;