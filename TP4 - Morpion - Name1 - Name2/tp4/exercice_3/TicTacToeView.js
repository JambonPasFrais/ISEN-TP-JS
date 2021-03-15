class TicTacToeView {
    constructor(game, gameName){
        this.game = game;//Instance de TicTacToe
        this.gameName = gameName; //Nom de la partie
        this.initGame(); //Initie la partie
    }
    initGame(){
        this.setCurrentPlayer();//Indique le joueur qui doit jouer
        this.initListener();//Initie tous les listeners pour jouer
    }
    setCurrentPlayer(){
        const span = document.getElementById("player_number");
        //On cherche qui doit jouer
        if (this.game.getCurrentPlayer() == 0){
            span.innerText = "Valentin";
        }
        else{
            span.innerText = "Mikael";
        }
    }
    initArrayEvents(){
        const gameEnded = document.getElementById("end");
        //Si la partie est finie on update les infos de jeu sinon on ne fait rien.
        if (this.game.isFinished()){
            //Il y a un gagnant
            if(this.game.hasWinner()){
                //On cherche le gagnant.
                if (this.game.getWinner() == 0){
                    gameEnded.innerText = "Valentin a gagné !";
                }
                else{
                    gameEnded.innerText = "Mikael a gagné !";
                }
            }
            //Il n'y a pas de gagnant
            else {
                gameEnded.innerText = "Match nul !";
            }
        }
    }
    initListener(){
        const morpion = document.getElementById('morpion');
        
        //On ajoute un listeners sur toutes les lignes & colonnes du Tableau 'morpion'
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                morpion.rows[i].cells[j].addEventListener('click', () => {
                    this.playEvent(i, j);//Lorsqu'on clique la fonction se déclenche
                });
            }
        }

        const resetButton = document.getElementById('reset');

        //On ajoute un listener sur le bouton "reset" et on exécute la fonction resetEvent en conséquence.
        resetButton.addEventListener('click', () =>{
            this.resetEvent();
        });
    }
    playEvent(x, y){//On joue à la coordonnée X, Y
        
        if (!this.game.isFinished()){//Si jamais la partie est finie on ne peut plus jouer

            //On identifie le joueur qui joue
            if (this.game.getCurrentPlayer() == 0){
                //Le joueur joue.
                const img1 = document.createElement('img');
                img1.src = "Joueur1.jpg"; //Image de LinkedIn si vous vous posiez la question ;)
                morpion.rows[x].cells[y].appendChild(img1); //Son image s'affiche là où il joue.

            }
            else {
                const img2 = document.createElement('img');
                img2.src = "Joueur2.jpg"; //Image du site ISEN
                morpion.rows[x].cells[y].appendChild(img2);
            }
            //On joue en 'console'
            this.game.play(x, y);
            //On vérifie que la partie n'est pas finie
            this.initArrayEvents();
            //On update le joueur qui joue.
            this.setCurrentPlayer();
        }
    }
    resetEvent(){
        //On reset le jeu en console.
        this.game.reset();
        //On reset le tour de jeu.
        this.setCurrentPlayer();
        //On vide le tableau
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                morpion.rows[i].cells[j].innerText = ' ';
            }
        }
        //On enlève la notification de victoire.
        const gameEnded = document.getElementById("end");
        gameEnded.innerText = ' ';
    }
}