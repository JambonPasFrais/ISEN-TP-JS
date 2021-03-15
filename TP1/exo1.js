let a = 1, b = 2;
let resultat = 0;

 function add(a, b){
    resultat = a + b;
    return resultat;
 }
 
 function sous(a, b){
    resultat = a - b;
    return resultat;
 }

 function mult(a, b){
    resultat = a * b;
    return resultat;
 }

 function div(a, b){
    resultat = a / b;
    return resultat;
 }

 function sqr(a){
    resultat = a*a;
    return resultat;
 }
 console.log("a^2 =", sqr(a), ", a + b =", add(a, b), ", a - b =", sous(a, b), ", a / b =", div(a,b), ", a * b =", mult(a,b));