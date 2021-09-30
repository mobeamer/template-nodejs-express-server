var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
const path = require('path');
var mysql = require('mysql2');

const Config = require('./classes/server-config.class.js');
const User = require('./classes/server-user.class.js');
const DataPacket = require('./classes/server-data-packet.class.js');


var options = {logging:true};
var config = new Config();

///////////////////////////////
//
// Variables
//
///////////////////////////////

var port = 4000;

var publicDir = path.join(__dirname, 'public')

app.set('port', process.env.PORT || port)

app.use(express.static('public'));


///////////////////////////////
//
// Test End Points
//
///////////////////////////////

app.get('/test/json', function(req, res){
  
  var data = {test:"test",arrayTest:["1","2","3"]};

  res.json(data);
  
});

app.get('/test/user', function(req, res){
  
  const conn = GetConn(config);

  var user = new User();

  res.json(user.getData());
  
});

app.get('/test/add-user', function(req, res){
  
  (async function(){

    const conn = GetConn(config);

    var userData = {username:"test-user",password:"testIt!",email:"test@gmail.com"};
    
    var user = new User(); 

    var data = await user.newUser(conn, userData);
  
    console.log("DATA", data);
  
    res.json(data);
  
})()

  
});



app.get('/test/login-successful', function(req, res){
  
  (async function(){

    const conn = GetConn(config);

    var userData = {username:"test-user",password:"testIt!"};
    
    var user = new User(); 

    var data = await user.authenticate(conn, userData);
  
    console.log("DATA", data);
  
    res.json(data);
  
})()

  
});




app.get('/test/login-failure', function(req, res){
  
  (async function(){

    const conn = GetConn(config);

    var userData = {username:"test-user",password:"BAD PASSSS!"};
    
    var user = new User(); 

    var data = await user.authenticate(conn, userData);
  
    console.log("DATA", data);
  
    res.json(data);
  
})()

  
});



http.listen(port, function(){
  console.log('listening on port: ' + port);
});




function GetConn(config)
{
  var con = mysql.createConnection({
    host: config.getDatabaseConfig().host,
    user: config.getDatabaseConfig().user,
    database: config.getDatabaseConfig().database,
    password: config.getDatabaseConfig().password
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected successfully to database!");
  });

  return con;
}

