var url = require("url");
var http = require('http');
var fs = require('fs');

 


var server = http.createServer(function(req, res) {
     var page = url.parse(req.url).pathname;
 
var pa;
       if(page=='/'){

pa='./acceuil.html';

  
 }
 else if (page=='/toChat')
 {
    pa='./toChat.html';
      }
      else

      {
pa=' ';
      }
   
    fs.readFile(pa, 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);

});




 
});
 var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  socket.on('nv_user', function(pseudo) {

    if(pseudo.trim()!=''){
    socket.pseudo = pseudo;

 

}
else
{
    console.log('faut entrer un user valide :( ');
}
socket.emit('tochatspace','welcome');
}); 
 



 });
server.listen(8080);