/* NodeJS Server - SOFT352 - Nicholas Cox - 10050654 - Plymouth University */

var express = require('express');
var server = require('http').createServer(function(request, response){

});

var io = require('socket.io')(server);
var fs = require("fs");
var path = require("path");
var app = express();
app.use(express.bodyParser());
app.use("/css", express.static(__dirname + '/css'));
app.use("/dependencies", express.static(__dirname + '/dependencies'));
app.use("/app", express.static(__dirname + '/app'));
app.use("/assets", express.static(__dirname + '/assets'));

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

//Endpoints
app.get('/notes', function(request, response) {
  //res.json({notes: "This is your notebook. Edit this to start saving your notes!"})
});

app.listen(port, function(){
	console.log("here comes your man");
});