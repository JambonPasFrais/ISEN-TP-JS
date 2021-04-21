//Jeu
(function (){
    //Randomized
    let wordIndex = Math.floor(Math.random() * (words_list.length));
    let game = new pendu(words_list[wordIndex].word, words_list[wordIndex].tip);
    let view = new penduView(game);
})();

let welcomeMessage = document.getElementById('welcome');

socket.emit('login', '');

//tentative ratée :(
//socket.emit('end', (1, 10));

socket.on('new-player', msg => {
    welcomeMessage.innerText = msg;
});