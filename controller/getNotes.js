/*jshint esversion: 6 */

var User = require('../app/models/user');
var ErrorMessage = require('../app/models/responseSchemas/error');
var SuccessMessage = require('../app/models/responseSchemas/successSchema');

exports.getNotes = (req,res) => {
  // console.log("headers" + req.headers.api_token);
  var api_token;
  if(req.body.api_token !== undefined){
    api_token = req.body.api_token;

  }else if(req.headers.api_token !== undefined){
    api_token = req.headers.api_token;
  }
  if(api_token !== undefined){
    User.findOne({'api_token' : api_token}, function(err,docs){
      if(!docs){
        error = new ErrorMessage();
        error.error.status = 401;
        error.error.message = "Invalid api_token";
        res.status(error.error.status);
        res.send(error);
      }else{
        success = new SuccessMessage();
        success.status = 200;
        success.payload.data = docs.notes;
        res.status(200);
        res.send(success);
      }
    });
  }else{
    error = new ErrorMessage();
    error.error.status = 400;
    error.error.message = "Missing paramater: 'api_token'";
    res.status(error.error.status);
    res.send(error);
  }
};
