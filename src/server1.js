/* NodeJS Server - SOFT352 - Nicholas Cox - 10050654 - Plymouth University */
var port = 8080;
var express = require('express');
var bodyParser = require('body-parser');
//used to auth requests
var passport = require('passport');
var server = require('http').createServer(function(request, response){
	response.end("test");
});
var mongodb = require('mongodb');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/FindN');
require('./models/user');
var io = require('socket.io')(server);
var fs = require("fs");
var path = require("path");
var app = express();

app.use(passport.initialize());
require('./config/passport');
//uses
app.use(passport.session({ secret: 'ibehappyibehappyibehappyibehappy'})); //sesh secret

app.use(passport.session());
app.use(bodyParser.json()); //Allow our request body to come through yo
//app.use('/', index);
//app.use('/users', login);
app.use("/css", express.static(__dirname + '/css'));
app.use("/dependencies", express.static(__dirname + '/dependencies'));
app.use("/app", express.static(__dirname + '/app'));
app.use("/assets", express.static(__dirname + '/assets'));

//routes here
require('./routes/index')(app, passport);
require('./routes/users')(app, passport);

//socketio listener
io.on('connection', function(socket){
  	socket.on('event', function(data){

  });
  	socket.on('disconnect', function(){
  });
});

app.listen(port, function(){
	console.log("something good");
});