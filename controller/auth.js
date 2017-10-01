/*jshint esversion: 6 */

exports.checkAuth = (req,res,next) => {
  var api_token;
  if(req.body.api_token !== undefined){
    api_token = req.body.api_token;

  }else if(req.headers.api_token !== undefined){
    api_token = req.headers.api_token;
  }
  if(api_token !== undefined){
    User.findOne({'api_token' : api_token}, function(err,docs){
      if(!docs){
        return false;
      }else{
        return true;
      }
    }
  );
}
};
