let truth = "nunc est bibendum, nunc pede libero pulsanda tellus";
//Partie 1
for (let i = 0; i <truth.length; i++){
    if (truth[i] != ' ' ){
        console.log(truth[i]);
    }
    else {
        truth.length -= 1;
    }
}
//Partie 2
console.log(truth.replace('bibendum', 'michelin'));

//Partie 3
let emptyStr = "";
let nbmot = 0;
let nblettre = 0;
let nblettremoyenne = 0;
let i = 0;

if (truth !== emptyStr){
    nbmot++;
}
for (i = 0; i < truth.length; i++){
    if (truth[i] == ' '){
        nbmot++;
    }
    else {
        if (truth[i] != ',' || truth[i] != '!' || truth[i] != '.' || truth[i] != ':'){
        nblettre++;
        }
    }
}

nblettremoyenne = nblettre / nbmot;

console.log(nbmot, nblettre, nblettremoyenne);

//Partie 4
/*for (i = 0; i < truth.length; i++){
    if (truth[i - 1] == " "|| i == 0){
        truth = truth.replace(truth.slice(i,i+1), truth.slice(i,i+1).toUpperCase());   
    }
}
console.log(truth);*/

for (let parcours of truth.split(' ')){
    parcours = parcours.replace(parcours.slice(0,1), parcours.slice(0,1).toUpperCase());
    console.log(parcours);
}
