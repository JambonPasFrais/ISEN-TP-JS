class TicTacToe extends Observable{
    constructor(){
        super();
        this.currentPlayer = 0;
        this.grid = new Array(3);
        for (let i = 0; i < 3; i++ ){
            this.grid[i] = new Array(3);
        }
    }
    play(a, b){
        this.grid[a][b] = this.currentPlayer;
        this.currentPlayer = (this.currentPlayer + 1 ) % 2;
    }
    reset(){
        for(let i = 0; i<3;i++){
            for (let j = 0; j<3;j++){
                this.grid[i][j] = undefined;
            }
        }
        this.currentPlayer = 0;
    }
    getCurrentPlayer(){
        return this.currentPlayer;
    }
    getCaseState(a, b){
        return this.grid[a][b];
    }
    isWonLine(){
        for (let i = 0; i < 3; i++){
            let cpt0 = 0;
            let cpt1 = 0;
            for (let j = 0; j < 3 ; j++){
                if (this.getCaseState(i, j) == 0){
                    cpt0++;
                }
                else if (this.getCaseState(i, j) == 1){
                    cpt1++;
                }
            }
            if (cpt0 == 3 || cpt1 == 3){
                return true;
            }
        }
        return false;
    }
    isWonColumn(){
        for (let i = 0; i < 3; i++){
            let cpt0 = 0;
            let cpt1 = 0;
            for (let j = 0; j < 3 ; j++){
                if (this.getCaseState(j, i) == 0){
                    cpt0++;
                }
                else if (this.getCaseState(j, i) == 1){
                    cpt1++;
                }
            }
            if (cpt0 == 3 || cpt1 == 3){
                return true;
            }
        }
        return false;
    }
    isWonDiag(){
        if (this.getCaseState(1,1) != undefined){
            if (this.getCaseState(0,0) == this.getCaseState(1,1) && this.getCaseState(1,1) == this.getCaseState(2,2)){
                return true;
            }
            else if (this.getCaseState(2, 0) == this.getCaseState(1,1)&& this.getCaseState(0,2) == this.getCaseState(1,1)){
                return true;
            }
        }
        return false;
    }
    isFinished(){
        if (this.hasWinner()){
            return true;
        }
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (this.getCaseState(i, j) == undefined){
                    return false;
                }
            }
        }
        return true;   
    }
    hasWinner(){
        if (this.isWonColumn() || this.isWonDiag() || this.isWonLine()){
            return true;
        }
        return false;
    }
    getWinner(){
        if (this.hasWinner()){
            return (this.getCurrentPlayer() + 1) % 2;
        }
        return undefined
    }
}