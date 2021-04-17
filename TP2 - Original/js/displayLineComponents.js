//Création du module pour la création de ligne en fonction des informations récupérées dans components-data.js
let create_component_line = (function (){                  
    function create_line(n){//Fonction création de ligne.
        let tab_comp = document.getElementById("tab_comp");//On trouve l'élément tableau
        //On va à 'N + 1' car la ligne 'N' existe déjà
        tab_comp.insertRow(n + 1);//On insert une ligne dans le tableau
        for (let i = 0; i < 6; i++){
            tab_comp.rows[n + 1].insertCell(i);//On insert une cellule dans la ligne du tableau
        }
        tab_comp.rows[n + 1].cells[0].innerText = component().component_name(n);//On met le nom
        tab_comp.rows[n + 1].cells[1].innerText = ((Number(component().component_needrecipe(n))) ? "Oui" : "Non");//On indique s'il a besoin d'un récipient ou non
        tab_comp.rows[n + 1].cells[2].innerText = component().component_price(n) + " €";//On met le prix
        tab_comp.rows[n + 1].cells[3].innerText = component().component_type(n);//On met le type de composant
        tab_comp.rows[n + 1].cells[4].innerText = ((Number(component().component_bulk(n))) ? "Oui" : "Non");//On indique s'il est disponible en vrac
        tab_comp.rows[n + 1].cells[5].innerText = (Number(component().component_percentused(n)) * 100) + ' %';//On indique le pourcentage utilisé de ce composant
    }
    return {
        display_line: (n) => create_line(n)//On simplifie l'écriture
    }
})
