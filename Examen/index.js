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
const fs = require('fs');
const mysql = require('mysql');

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

app.get('/', (req, res) => {
  let sessionData = req.session;

  if (!sessionData.username) {
    res.sendFile(__dirname + '/front/html/login.html');
  }
  else {
    res.sendFile(__dirname + '/front/html/jeu.html');
  }
});

//app.post
app.post('/login', body('login').isLength({ min: 3 }).trim().escape(), (req, res) => {
  const login = req.body.login
  // Error management
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
  } else {
    // Store login
    req.session.username = login;
    req.session.save();
    res.redirect('/');
  }
});

//When we launch the game
io.on('connection', (socket) => {
  socket.on('login', () => {
    io.emit('new-player', 'Dernière connexion: ' + socket.handshake.session.username);

    //player init in Json file
    fs.readFile(__dirname + '/back/data/players.json', (err, data) => {
      if (err) throw err;
      const players = JSON.parse(data);

      //Useful variable to check if the player already exists
      let Players = [];
      for (let i = 0; i < players.players.length; i++) {
        Players.push(players.players[i].name);
      }

      //Check if player exists
      let index = Players.indexOf(socket.handshake.session.username);
      //if not
      if (index === -1){
        let newPlayer = {
          "name": socket.handshake.session.username,
          "gamesNb": 1,
          "nbTry": 100//Worst score possible
        };
        players.players.push(newPlayer);
      }
      //if yes
      else{
        let updatePlayer = {
          "name": players.players[index].name,
          "gamesNb": players.players[index].gamesNb + 1,
          "nbTry": players.players[index].nbTry
        };
        players.players[index] = updatePlayer;
      }
      //We do that anyway
      let mydatas = JSON.stringify(players, null, 2);
      fs.writeFile(__dirname + '/back/data/players.json', mydatas, (err) => {
        if (err) throw err;
        console.log('json updated');
      });
    });
  });

  /*Tentative ratée de mettre le score à jour car je n'arrive pas à récupérer les données x)
  socket.on('end', (gameNb, score) => {
    fs.readFile(__dirname + '/back/data/players.json', (err, data) => {
      if (err) throw err;
      const players = JSON.parse(data);
      players.players[1].gamesNb = gameNb;
      players.players[1].nbTry = score;
      let mydatas = JSON.stringify(players, null, 2);
      fs.writeFile(__dirname + '/back/data/players.json', mydatas, (err) => {
        if (err) throw err;
        console.log('Player updated');
      });
    });
  });*/

  socket.on('disconnect', () => {
    io.emit('new-player', 'Dernière déconnexion: ' + socket.handshake.session.username);
  });
});

//http
http.listen(4200, () => {
  console.log('Serveur lancé sur le port 4200');
});