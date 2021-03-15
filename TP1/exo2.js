let a = 1, b = 0;
let resultat = 0;
let add = (a, b) => a + b; 
let mult = (a, b) => a * b; 
let sous = (a, b) => a - b; 
let div = (a, b) => b != 0 ? a / b : "Error"; 
let sqr = a => a*a; 
console.log("a * a =", sqr(a), ", a + b =", add(a, b), ", a - b =", sous(a, b), ", a / b =", div(a,b), ", a * b =", mult(a,b));