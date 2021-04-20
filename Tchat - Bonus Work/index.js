/***  importation des librairies npm  ***/

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require("express-session")({
  // CIR2-chat encode in sha256
  secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000,
    secure: false
  }
});

const sharedsession = require("express-socket.io-session");
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

/*** configuration des révisions ***/
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Init of express, to point our assets
app.use(express.static(__dirname + '/front/'));
app.use(urlencodedParser);
app.use(session);

// Configure socket io with session middleware
io.use(sharedsession(session, {
  // Session automatiquement sauvegardée en cas de modification
  autoSave: true
}));

// Détection de si nous sommes en production, pour sécuriser en https
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  session.cookie.secure = true // serve secure cookies
}

/***  code spécifique ***/

//app.get('path') -> redirection 
//js -> window.location.href = 'path'

app.get('/', (req, res) =>{
    let sessionData = req.session;

    if(!sessionData.username){
        res.sendFile(__dirname + '/front/html/logging.html');
    }
    else {
        res.sendFile(__dirname + '/front/html/index.html');
    }
});

//app.post
app.post('/login', body('login').isLength({ min: 3 }).trim().escape(), (req, res) => {
    const login = req.body.login
  
    // Error management
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      //return res.status(400).json({ errors: errors.array() });
    } else {
      // Store login
      req.session.username = login;
      req.session.save()
      res.redirect('/');
    }
  });

//io = for( premier socket au dernier )
//socket.on créé la fonction
//socket.emit appelle le socket.on
io.on('connection', (socket) =>{

    socket.on('login', () =>{
        io.emit('new-message', 'Oh ' + socket.handshake.session.username + ' apparaît');
        io.emit ('new-user', socket.handshake.session.username);
    });

    socket.on('message', (msg) =>{
        io.emit('new-message', socket.handshake.session.username + ' : ' + msg);
    });

    socket.on('disconnect', () =>{
        io.emit('new-message', 'Oh ' + socket.handshake.session.username + ' s\'est déconnecté');
        io.emit('lost-user', socket.handshake.session.username);
    });
});

//http

http.listen(4200, () => {
    console.log('Serveur lancé sur le port 4200');
});