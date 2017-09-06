/*jshint esversion: 6 */
// require('dotenv').config();
// var AWS = require('aws-sdk');
var User = require('../app/models/user');
var Note = require('../app/models/note');
// var ImageNote = require('../apps/models/imageNote');
var ErrorMessage = require('../app/models/responseSchemas/error');
var SuccessMessage = require('../app/models/responseSchemas/successSchema');
var multer = require('multer');
var upload = multer({dest: 'tempUploads/'});
// Config AWS
// AWS.config.update({accessKeyId=process.env.accessKeyId, secretAccessKey=process.env.secretAccessKey});
// var s3 = new AWS.S3();

exports.createTextNote = (req,res) => {
  console.log("Creating Note");
  if(req.body.api_token !== undefined){
    User.find({'api_token' : req.body.api_token}, function(err,docs){
      if(!docs){
        res.json({"error" : "INVALID api_token"});
      }else{
        var tempNote = new Note();
        if(req.body.Title === undefined || req.body.Content === undefined){
          res.json({"error": "Incomplete Request"});
        }
        tempNote.Title = req.body.Title;
        tempNote.Content = req.body.Content;
        tempNote.author_id = docs[0]._id;
        docs[0].notes.push(tempNote);
        docs[0].save(function(err){
          if(err){
          // console.log("ERROR");
            res.send(err);
          }
          res.json({status: "Successfully Created Note"});
        });
      }
    });
  }
};

exports.createImageNote =(req,res) => {
  console.log("Creating Note");
  if(req.body.api_token !== undefined){
    User.find({'api_token' : req.body.api_token}, function(err,docs){
      if(!docs){
        res.json({"error" : "INVALID api_token"});
      }else{
        var tempNote = new Note();
        if(req.body.Title === undefined){
          res.json({"error": "Incomplete Request"});
        }

        tempNote.Title = req.body.Title;
        if(req.body.Content !== undefined){
          tempNote.Content = req.body.Content;
        }
        tempNote.imageUrl = req.body.imageUrl;
        tempNote.noteType = "image";
        tempNote.author_id = docs[0]._id;
        docs[0].notes.push(tempNote);
        docs[0].save(function(err){
          if(err){
          // console.log("ERROR");
            res.send(err);
          }
          res.json({status: "Successfully Created Image Note"});
        });
      }
    });
  }
};
