var getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

let eaters = 0, burgerEaters = 0, burgers = 125, satisfied = 0, Moyenne = 0, satisfiedTotal = 0, echantillon = 100;

for (let i = 0; i < echantillon; i++){
    eaters = getRandomInt(80) + 160; // Les affamés varient de 160 à 240 pour une moyenne de 200.
    burgerEaters = (getRandomInt(0.20) + 0.50) * eaters; //Nombre random variant de 0.5 à 0.7 pour les "mangeur de burgers"
    satisfied = burgerEaters / burgers * 100; // Pourcentage des clients satisfaits. 
    satisfiedTotal += satisfied; //Nombre total de client satisfaits après échantillonage
}
Moyenne = satisfiedTotal / echantillon; // Pourcentage de personnes satisfaites
console.log("Réponse à la demande :", Moyenne, "%");