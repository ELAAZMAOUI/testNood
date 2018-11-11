var http = require('http');
var fs = require('fs');
const player = require ( 'play-sound' ) ( ) ;
// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./coteClient.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});
 
 

  

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
 
socket.on('petit_nouveau',function(pseudo){
 
if(pseudo.trim()!=''){
console.log('le pseudo :'+pseudo);
socket.pseudo=pseudo;
socket.emit('pseudovalide', socket.pseudo);
socket.broadcast.emit('nv_user', socket.pseudo);
}else
{
	socket.emit('pseudoInvalide','le pseudo est ivalide veuillez entrez un valide !!');
}}
);

socket.on('message',function(msg){
console.log('pseudo :'+socket.pseudo);
console.log('message :'+msg);
socket.broadcast.emit('nv_msg', {pseudo:socket.pseudo,message:msg});

});
socket.on('disconnect', function() {
   console.log(socket.pseudo+' est disconnect');

 socket.broadcast.emit('user_dic', socket.pseudo);
});
socket.on('ntif_sound',function()
{
	 player.play('./that-look.mp3', function (err) {
   if (err) throw err;
   console.log("Audio finished");
 });
}

	);
});


server.listen(8080);