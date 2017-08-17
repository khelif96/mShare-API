/*jshint esversion: 6 */

var ErrorMessage = require('../app/models/responseSchemas/error');
var SuccessMessage = require('../app/models/responseSchemas/successSchema');

exports.getApi = (req, res) => {
  var success = new SuccessMessage();
  success.status = 200;
  success.payload.message = "Welcome to the mshare-api";
  res.send(success);
};

exports.postApi = (req,res,next) => {
  var error = new ErrorMessage();
  error.error.status = 403;
  error.error.message = "Route does not allow POST";
  res.send(error);
};
