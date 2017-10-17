/* NodeJS Server - SOFT352 - Nicholas Cox - 10050654 - Plymouth University */
var express = require('express');
//used to auth requests
var passport = require('passport');
var server = require('http').createServer(function(request, response){
	response.end("test");
});
var mongodb = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/findn');
var db = mongoose.connection;
var io = require('socket.io')(server);
var fs = require("fs");
var path = require("path");
var app = express();

//passport

app.use(passport.initialize());
app.use(passport.session());


//routes here
/*var index = require('./index');
var login = require('./login');*/

app.use("/css", express.static(__dirname + '/css'));
app.use("/dependencies", express.static(__dirname + '/dependencies'));
app.use("/app", express.static(__dirname + '/app'));
app.use("/assets", express.static(__dirname + '/assets'));

/*app.all('*',function(req,res){
    if(req.isAuthenticated()){
        
    }else{
    	//Nav to login/register page
        response.sendFile(__dirname + "/login.html"); // 401 Not Authorized
    }
});*/

io.on('connection', function(socket){
  	socket.on('event', function(data){

  });
  	socket.on('disconnect', function(){
  });
});

var port = 8080;

//onload
app.get('/', function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get('/login', function(request, response) {
  response.sendFile(__dirname + "/login.html");
});

//routing
/*app.use("/", index);
app.use("/login", login);*/


app.get('auth', function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

//Endpoints
app.get('/notes', function(request, response) {
  //res.json({notes: "This is your notebook. Edit this to start saving your notes!"})
});

app.listen(port, function(){
	console.log("something good");
});