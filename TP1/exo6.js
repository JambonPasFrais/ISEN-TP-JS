var Histogramme = function (myArray) {
    var myTab1 = new Array(Math.max.apply(null, myArray));
    for (var i = 0; i < 11; ++i){
        myTab1[i] = new Array(myArray.length);
    }
    for (var j = 0; j < myArray.length; j++){
        for (var i = 0; i < myTab1.length - myArray[j]; i++){
            myTab1[i][j] = '.';
        }
    }
    for (var i = 0; i < myTab1.length; i++){
        for (var j = 0; j < myArray.length; j++){
            if (myTab1[i][j] != '.'){
                myTab1[i][j] = '#';
            }
        }
    }
    console.table(myTab1);
}
var myArray = [4, 1, 8, 3, 10, 6, 7, 2, 9, 3];
Histogramme(myArray);