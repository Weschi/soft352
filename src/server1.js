/* NodeJS Server - SOFT352 - Nicholas Cox - 10050654 - Plymouth University */
var port = 8080;
var express = require('express');
var bodyParser = require('body-parser');
//used to auth requests
var passport = require('passport');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var moment = require('moment');
var schedule = require('node-schedule');
var _ = require("lodash");
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/FindN');

//models
require('./models/user');
require('./models/notification');
require('./models/meeting');
var User = mongoose.model('User');
//init socket io with our server
var fs = require("fs");
var path = require("path");
var app = express();
var server = app.listen(port, function(){
  console.log("Something good! Listening on 8080.");
});
var io = require('socket.io').listen(server);
app.use(passport.initialize());
require('./config/passport');
//uses
app.use(passport.session({ secret: 'ibehappyibehappyibehappyibehappy'})); //sesh secret
app.use(passport.session());
app.use(bodyParser.json()); //Allow our request body to come through yo

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

app.use("/css", express.static(__dirname + '/css'));
app.use("/dependencies", express.static(__dirname + '/dependencies'));
app.use("/app", express.static(__dirname + '/app'));
app.use("/assets", express.static(__dirname + '/assets'));
app.get('/', function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

//helpers
var scheduler = require('./routes/helpers/scheduler');

//routes or controllers, here
require('./routes/users')(app, passport, _, io, scheduler);
require('./routes/meetings')(app, passport, _, io, scheduler);
require('./routes/notifications')(app, passport, _, io, scheduler);

//socketio listener
io.on('connection', function(socket){
  console.log('user connected');
  socket.on('join', function(data){
    //join socket room based on loggin in user's id
    socket.join(data.id);
  });
  socket.on('location', function(data){
    //we have new coords and userId, so emit to our own channel and broadcast the coords!
    io.sockets.in(data.userId).emit('coordChange', data);

    //for offline support, update the user with new coords? 
    User.findById(data.userId, function(error, user){
      user.location = data.coords;
      user.save(function(error){});
    });
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
