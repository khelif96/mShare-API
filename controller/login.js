/*jshint esversion: 6 */

var bcrypt = require('bcryptjs');
var hat = require('hat');

var User = require('../app/models/user');
var ErrorMessage = require('../app/models/responseSchemas/error');
var SuccessMessage = require('../app/models/responseSchemas/successSchema');

const saltRounds = 10;

// Configure hat for generating api tokens
var rack = hat.rack(64,16);

exports.getLoginUser = (req,res) => {
  res.json({message: "/loginUser Route"});
};

exports.loginUser = (req,res) => {
  if(req.body.email === undefined || req.body.password === undefined){
    error = new ErrorMessage();
    error.error.status = 400;
    error.error.message = "Missing email or password in request";
    res.status(error.error.status);
    res.send(error);

  }else{
    console.log("Trying to find email");
    User.find({email: new RegExp(req.body.email, 'i')}, function (err,docs){
      if(!docs.length || err){
        console.log("docs.length");
        error = new ErrorMessage();
        error.error.status = 401;
        error.error.message = "Could not find account";
        res.status(error.error.status);
        res.send(error);

      }else{
        console.log("Somehow got here");
        // TODO check password hash if matches stored password if so return an api_token
          bcrypt.compare(req.body.password,docs[0].password_hash, function(err, valid){
            if(valid){
              success = new SuccessMessage();
              success.status = 201;
              success.payload.data = {"api_token":docs[0].api_token };
              res.status(success.status);
              res.send(success);
              // res.json({api_token: docs[0].api_token});
            }else{
              error = new ErrorMessage();
              error.error.status = 401;
              error.error.message = "Invalid Password";
              res.status(error.error.status);
              res.send(error);
            }
          });
      }
  });
}
};

exports.registerUser = (req,res) => {
  if(req.body.email === undefined || req.body.password === undefined){
    error = new ErrorMessage();
    error.error.status = 400;
    error.error.message = "Missing email or password in request";
    res.status(error.error.status);
    res.send(error);
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
          success = new SuccessMessage();
          success.status = 201;
          success.payload.data = {"api_token":tempUser.api_token };
          res.status(success.status);
          res.send(success);
          // res.status(201);
          // res.json({api_token: tempUser.api_token, status: "Successfully Created User"});
        });

      });
      }else{
        error = new ErrorMessage();
        error.error.status = 400;
        error.error.message = "Email belongs to another user";
        res.status(error.error.status);
        res.send(error);
      }
    });
  }
};
