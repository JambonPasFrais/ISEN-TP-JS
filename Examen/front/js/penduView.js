//View class
class penduView{
    constructor(game){
        this.game = game;//Instance of pendu
        this.initGame();
    }
    initGame(){
        this.showInfo();
        this.initWord();
        this.initListener();
    }
    showInfo(){
        let turn = document.getElementById('turn');
        turn.innerText = this.game.Turn;

        let score = document.getElementById('score');
        score.innerText = this.game.score;

        let fail = document.getElementById('fail');
        fail.innerText = this.game.nbFail;

        if (this.game.nbFail >= 1){
            let potence = document.getElementById('potence');
            if (potence.rows[0].cells[0].children[0] !== undefined){
                potence.rows[0].cells[0].removeChild(potence.rows[0].cells[0].children[0]);
            }
            let img = document.createElement('img');
            img.src="../img/potence" + (this.game.nbFail - 1) + ".png";
            potence.rows[0].cells[0].appendChild(img);
        }
    }
    initWord(){
        let wordTab = document.getElementById('word');
        for (let i = 0; i < this.game.answer.length; i++){
            wordTab.rows[0].insertCell(i);
            wordTab.rows[0].cells[i].innerText = this.game.wordToFind[i];
        }
    }
    initListener(){
        let chatForm = document.getElementById('chatForm');
        let inputMessage = document.getElementById('input');
        let tipButton = document.getElementById('tip');

        chatForm.addEventListener('submit', event => {
            event.preventDefault();
            this.tryEvent(inputMessage.value);
        });
        tipButton.addEventListener('click', () => {
            this.hintEvent();
        }); 
    }

    tryEvent(event){
        if (this.game.isFinished()){
            return false;
        }
        if(event.length > 1){
            this.game.tryWord(event);
        }
        else {
            this.game.tryLetter(event);
        }
        this.updateGame();
    }

    hintEvent(){
        if (this.game.isFinished()){
            return false;
        }
        let hint = document.getElementById('hint');
        this.game.getHint();
        hint.innerText = this.game.hint;//Display the hint
        this.showInfo();
    }

    updateGame(){
        this.showInfo();
        let hint = document.getElementById('hint');
        hint.innerText = '';//Hide the hint
        let wordTab = document.getElementById('word');
        for (let i = 0; i < this.game.answer.length; i++){
            wordTab.rows[0].cells[i].innerText = this.game.wordToFind[i];
        }
        if (this.game.isFinished() && this.game.isWon()){
            alert("Vous avez gagné");
        }
        else if (this.game.isFinished() && !this.game.isWon()){
            alert ("Vous avez perdu");
            for (let i = 0; i < this.game.answer.length; i++){
                wordTab.rows[0].cells[i].innerText = this.game.answer[i];
            }
        }
        return true;
    }
}