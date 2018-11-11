var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();
 var arrayD = [ ];

/* On utilise les sessions */
app.use(session({secret: 'todotopsecret'}));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/todo', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    var fruits = [ ];
    req.session.arrayDo=arrayD;
 
   res.render('listPage.ejs',{arrayDo:req.session.arrayDo});

});
app.post('/todo/ajouter', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
if(req.body.todo!=""){
  arrayD.push(req.body.todo);
       req.session.arrayDo=arrayD;


     }
     res.render('listPage.ejs',{arrayDo:req.session.arrayDo})
   });
      
app.get('/todo/supprimer/:id', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
 
 if(req.params.id in req.session.arrayDo){
  arrayD.splice(req.params.id,1);
  req.session.arrayDo=arrayD;
 }

          res.render('listPage.ejs',{arrayDo:req.session.arrayDo})
});

// ... Tout le code de gestion des routes (app.get) se trouve au-dessus

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/html');
    res.status(404).send('Page introuvable !');
});

app.listen(8080);

 