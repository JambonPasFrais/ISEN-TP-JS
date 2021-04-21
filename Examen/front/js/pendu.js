//Exception not handle : user puts a number in the string
//main class
class pendu{
    constructor(word, hint){
        this.answer = word;//Le jeu choisit le mot aléatoirement (Initialisation dans main.js), c'est un tableau !!
        this.hint = hint;//Avec le fichier wordslist.js
        this.Turn = 0;//Potentiellement le même chose que score
        this.nbFail = 0;
        this.score = 0;//+1 / click, +5/hint
        this.wordToFind = new Array(this.answer.length);//Word the player is searching
        //Tab initialization
        this.wordToFind[0] = this.answer[0];//We always give the first letter
        //Then we fill the rest of the tab of '_'. 
        for (let i = 1; i < this.wordToFind.length; i++){
            //If it's a space
            if(this.answer[i].indexOf(" ") !== -1){
                this.wordToFind[i] = ' ';
                //We give the letter after a space (Bonus) (doesn't work at 100%)
                //this.wordToFind[i + 1] = this.answer[i + 1];
                //i++;
            }
            //We hide the rest of the word
            else if (this.wordToFind[0] !== this.answer[i].toUpperCase()){
                this.wordToFind[i] = '_';               
            }
            //However if the first letter repeats itself afterward, we also give it
            else{
                this.wordToFind[i] = this.wordToFind[0].toLowerCase();
            }
        }
    }
    
    //Personnal use for tests
    displayInfo(){
        return "Answer: " + this.answer + "\nHint: " + this.hint + "\nTurn: " + this.Turn + "\nFails: " + this.nbFail + "\nScore: " + this.score + "\nProgress: " + this.wordToFind + "\nFini: " + this.isFinished() + "\nGagné: " + this.isWon();
    }

    //User needs a hint
    getHint(){
        if (this.isFinished()){
            return false;//Didn't work
        }
        this.score += 5;
        return this.hint;
    }

    //Is the game won
    isWon(){
        //Lost game
        if (this.nbFail >= 7){
            return false;
        }
        //We look if the word is completed and start at index 1 because the first letter is given
        for (let i = 1; i < this.wordToFind.length; i++){
            if (this.answer[i] !== this.wordToFind[i]){//Find a difference
                return false;//Not won
            }
        }
        return true;
    }

    //Is the game Finished
    isFinished(){
        //2 cases exist for an ended game
        if (this.nbFail >= 7 || this.isWon()){
            return true;
        }
        //else it's not finished
        return false;
    }

    //User is trying a letter
    tryLetter(letter){
        if (this.isFinished() || letter === '' || letter === ' '){
            return false;//Didn't play
        }

        //If he didn't type the letter correctly
        letter = letter.toLowerCase();

        //Will be used just after
        let tempString = new Array (this.wordToFind.length);
        for (let i = 0; i < this.wordToFind.length; i++){
            tempString[i] = this.wordToFind[i].toLowerCase();
        }

        //Security
        if(letter.length > 1 || this.wordToFind.indexOf(letter) !== -1 || tempString.indexOf(letter) !== -1){
            return false;//Didn't play
        }
        
        //Fail encounter
        let correctGuess = false;

        //Trying to find if it's true
        for (let i = 0; i < this.answer.length; i++){
            if (this.answer[i].toLowerCase() === letter){//He find a letter !
                //We update the current word
                this.wordToFind[i] = letter;
                correctGuess = true;
            }
        }

        if (!correctGuess){
            this.nbFail++;//He Failed :(
        }

        this.Turn++;
        this.score++;

        return true; //Played successfully
    }

    //User trying to guess the complete word
    tryWord(word){
        if (this.isFinished() || word.length !== this.answer.length){//We don't count this fail since it's just a matter of length
            return false;//Didn't play
        }

        if (word.toLowerCase() === this.answer.toLowerCase()){//Correct guess
            //Implementing the correct word into the string he needs to find (In order to make isFinished work well)
            for (let i = 1; i < this.wordToFind.length; i++){
                this.wordToFind[i] = this.answer[i];
            }
        }

        else{//Incorrect Guess
            this.nbFail++;
        }

        this.score++;
        this.Turn++;

        return true;//Played successfuly
    }
}