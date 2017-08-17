/*jshint esversion: 6 */

var User = require('../app/models/user');
var Note = require('../app/models/note');
var ErrorMessage = require('../app/models/responseSchemas/error');
var SuccessMessage = require('../app/models/responseSchemas/successSchema');


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
