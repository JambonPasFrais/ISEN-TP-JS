//Création du module pour la création de ligne en fonction des informations récupérées dans components-data.js
let create_component_line = (function (){                  
    function create_line(n){//Fonction création de ligne.
        let tab_comp = document.getElementById("tab_comp");//On trouve "l'élément tableau"
        let line_tab_comp = tab_comp.insertRow(n);//On insert une ligne dans le tableau qu'on a passé en variable
        for (let i = 0; i < 6; i++){
            let cell = line_tab_comp.insertCell(i);//On insert une cellule dans la ligne du tableau passée en variable
            //Méthode approximative mais je n'ai pas trouvé d'autres moyens
            if (i == 0){
                cell.innerHTML = component().component_name(n);//On met le nom
            }
            else if (i == 1){
                //On indique si un récipient est nécéssaire
                if (component().component_needrecipe(n) == 1){ 
                    cell.innerHTML = "oui";
                }
                else if (component().component_needrecipe(n) == 0){
                    cell.innerHTML = "non";
                }
            }
            else if (i == 2){
                cell.innerHTML = component().component_price(n) + " €";//On met le prix
            }
            else if (i == 3){
                cell.innerHTML = component().component_type(n);//On met le type de composant
            }
            else if (i == 4){
            //On indique s'il est disponible en vrac
                if (component().component_bulk(n) == 1){ 
                    cell.innerHTML = "oui";
                }
                else if (component().component_bulk(n) == 0){
                    cell.innerHTML = "non";
                }
            }
            else if (i == 5){
                cell.innerHTML = component().component_percentused(n) * 100;//On indique le pourcentage utilisé de ce composant
            }
        }
    }
    return {
        display_line: (n) => create_line(n)//On simplifie l'écriture
    }
})
