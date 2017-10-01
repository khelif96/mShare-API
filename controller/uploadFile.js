/*jshint esversion: 6 */
require('dotenv').config();
var AWS = require('aws-sdk');
var ErrorMessage = require('../app/models/responseSchemas/error');
var SuccessMessage = require('../app/models/responseSchemas/successSchema');

// Config AWS
AWS.config.update({accessKeyId:process.env.accessKeyId, secretAccessKey:process.env.secretAccessKey});

const S3_BUCKET = process.env.s3Bucket;
var s3 = new AWS.S3();

exports.getSignedRequest = (req,res) => {
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
  console.log("fileName " + fileName + " fileType " + fileType);
  const s3Params = {
    Bucket: process.env.s3Bucket,
    Key: fileName,
    Expires: 120,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      res.send("ERROR" + err);
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
};
//
// exports.uploadFile = (req,res) => {
//   console.log("Uploading File");
//   if(req.body.api_token !== undefined){
//     User.find({'api_token' : req.body.api_token}, function(err,docs){
//       if(!docs){
//         res.json({"error" : "INVALID api_token"});
//       }else{
//
//
//         docs[0].notes.push(tempNote);
//         docs[0].save(function(err){
//           if(err){
//           // console.log("ERROR");
//             res.send(err);
//           }
//           res.json({status: "Successfully Created Note"});
//         });
//       }
//     });
//   }
// };
