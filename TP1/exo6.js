let Histogramme = function (myArray) {
    let myTab1 = new Array(myArray.length);
    //Create a 2D Tab
    for (let i = 0; i < myTab1.length; ++i){
        myTab1[i] = new Array(Math.max(...myArray));
    }
    
    for (let i = 0; i < myTab1.length; i++){
        for (let j = 0; j < myArray[i]; j++){
            myTab1[i][j] = '#';                
        }
    }
    console.table(myTab1);
}
let myArray = [4, 1, 8, 3, 10, 6, 7, 2, 9, 3, 12, 10, 3];
Histogramme(myArray);