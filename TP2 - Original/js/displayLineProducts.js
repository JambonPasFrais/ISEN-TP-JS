//Module qui va créer une ligne
let create_product_line = (function (){                  
    function create_line(n){//Fonction principale
        let tab_prod = document.getElementById("tab_prod");//On recherche l'élément du tableau dans lequel on va afficher la ligne.
        let line_tab_prod = tab_prod.insertRow(n);//On insert une ligne dans cet élément
        for (let i = 0; i < 6; i++){
            let cell = line_tab_prod.insertCell(i);//On insert une celule dans cette ligne en particulier
            //Encore une fois une méthode approximative mais nous n'avons pas trouvé de meilleure solution
            if (i == 0){
                cell.innerHTML = product().product_name(n);//Dans la cellule "0" on met le nom
            }
            else if (i == 1){
                cell.innerHTML = product().product_time(n);//Dans la cellule "1" on met le temps
            }
            else if (i == 2){
                cell.innerHTML = product().product_components_name(n) ;//Dans la cellule "2" on met la liste des composants du produit
            }
            else if (i == 3){
                cell.innerHTML = product().product_price(n);//Dans la cellule "3" on met le prix total du produit
            }
            else if (i == 4){
                cell.innerHTML = product().product_recipe(n);//Dans la cellule "4" on met le nombre de récipient nécessaire
            }
            else if (i == 5){
                cell.innerHTML = product().product_bulk(n);//Dans la cellule "5" on indique si les composants du produits sont oui ou non tous trouvables en Vrac
            }
        }
    }
    return {
        display_line: (n) => create_line(n)
    }
})
