/*jshint esversion: 6 */

var bcrypt = require('bcrypt');
var hat = require('hat');

var User = require('../app/models/user');

const saltRounds = 10;

// Configure hat for generating api tokens
var rack = hat.rack(64,16);

exports.getLoginUser = (req,res) => {
  res.json({message: "/loginUser Route"});
};

exports.loginUser = (req,res) => {
  if(req.body.email === undefined || req.body.password === undefined){
    res.json({error: "Missing email or password in request"});
  }else{
    console.log("Trying to find email");
    User.find({email: new RegExp(req.body.email, 'i')}, function (err,docs){
      if(!docs.length || err){
        console.log("docs.length");
        res.json({error: "Could not find account"});
      }else{
        console.log("Somehow got here");
        // TODO check password hash if matches stored password if so return an api_token
          bcrypt.compare(req.body.password,docs[0].password_hash, function(err, valid){
            if(valid){
              res.json({api_token: docs[0].api_token});
            }else{
              res.json({error: "Invalid Password"});
            }
          });
      }
  });
}
};

exports.registerUser = (req,res) => {
  if(req.body.email === undefined || req.body.password === undefined){
    res.status(400);
    res.json({error: "Missing email or password in request"});
  }else{
    User.find({email: new RegExp(req.body.email, 'i')}, function (err,docs){
      if(!docs.length){
        var tempUser = new User();
        tempUser.email = req.body.email;
        tempUser.api_token = rack();
        bcrypt.hash(req.body.password, saltRounds, function(err,hash){
          tempUser.password_hash = hash;
          tempUser.save(function(err){
            if(err){
            // console.log("ERROR");
              res.send(err);
          }
          res.status(201);
          res.json({api_token: tempUser.api_token, status: "Successfully Created User"});
        });

      });
      }else{
        res.status(400);
        res.json({error: "Email belongs to another user"});
      }
    });
  }
};
