// BASE SETUP
// ================================================
// Dependencies
try{
  var express = require('express'); // Call express
  var mongoose = require('mongoose'); // Interface for mongodb
  var bodyParser = require('body-parser');
  var PrettyError = require('pretty-error');
  var pe = new PrettyError();
  // var hat = require('hat'); // Library for generating random ids
  require('dotenv').config();
  // Winston Logger
  var logger = require('./utils/logger.js');

}catch(error){
  console.log("ERROR are all the Dependencies installed?");
  console.log(error);
  process.exit(1);
}
try{
// Mongodb
mongoose.connect(process.env.DB_URL,{useMongoClient:true}); // Connect to database on Server

var db = mongoose.connection;

db.once('open', function() {
  // we're connected!
  logger.log("info", "Status Code " + mongoose.connection.readyState + " Connected");

});

// When the connection is disconnected
db.on('disconnected', function () {
  logger.log("info", 'Mongoose default connection disconnected');
});

db.on('error', function(){
  logger.log("error", "ERROR Status Code " + mongoose.connection.readyState);
  process.exit(0);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  db.close(function () {
    logger.log('info', 'Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});



// Variables
var port = 3000; // Set our port Default is 80

// Configure hat for generating api tokens
// var rack = hat.rack(64,16);

// Express
var app = express(); // Define our app using expressnp

// Configure app to use bodyParser()
// This will let us get data from a POST
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Home Page
app.use(express.static('public'));

// ROUTES FOR API
// ===============================================
var apiRouter = require('./routes/api');      // Get an instance of the express router

  // Home Page
  // app.use(express.static('public'));




// REGISTER ROUTES --------------------------
// All api routes will be prefixed with /api
app.use('/api', apiRouter);

try{
// Start Server
  app.listen(port);
  logger.log('info', "Server started on port: " + port);
}catch(error){
  logger.log('error', error);
}
}catch(error){
  console.log(pe.render(error));
}
