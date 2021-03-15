//Module de création du tableau des composants
let create_component_tab = (function (){
    function create_tab(){//Création tableau
        for (let i = 0; i < 25; i++){//"25" car 25 composants dans "components-data.js"
            create_component_line().display_line(i);//Création d'une ligne / itération avec toutes les informations
        }
    }
    return {
        display_tab: () => create_tab()//Simplification d'écriture
    }
})