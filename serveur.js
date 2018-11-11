var http = require('http');
var express = require('express');


var app = express();
var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
 

  res.end('');


  
});
server.listen(8080);




 
 

 
