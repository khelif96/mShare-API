/*jshint esversion: 6 */

var User = require('../app/models/user');

exports.updateUser = (req,res) => {
  if(req.body.api_token !== undefined){
    User.find({'api_token' : req.body.api_token}, function(err,docs){
      if(!docs){
        res.status(401);
        res.json({"error" : "INVALID api_token"});
      }else{
        if(req.body.name !== undefined){
          docs[0].name = req.body.name;
        }
        if(req.body.birthDate !== undefined){
          docs[0].birthDate = req.body.birthDate;
        }
        docs[0].save(function(err){
          if(err){
          // console.log("ERROR");
            res.send(err);
          }
          res.status(200);
          res.json({status: "Successfully Updated User"});
        });
      }
    });
  }
};
