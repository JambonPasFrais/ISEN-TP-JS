let component = (function (){//Création du module component pour récupérer les différents paramètres de components-data.js
    function get_component_name(n) {
        return components_data[n]["name"];//Cherche un nom dans le tableau components_data en fontion de l'indice passé en paramètre
    }
    function get_component_needrecipe(n){
        return components_data[n]["needRecipe"];//Cherche si un récipient est nécéssaire dans le tableau components_data en fontion de l'indice passé en paramètre
    }
    function get_component_price(n) {
        return components_data[n]["price"];//Cherche un prix dans le tableau components_data en fontion de l'indice passé en paramètre
    }
    function get_component_type(n) {
        return components_data[n]["type"];//Cherche un type dans le tableau components_data en fontion de l'indice passé en paramètre
    }
    function get_component_bulk(n) {
        return components_data[n]["buyInBulk"];//Cherche si c'est un produit en vrac ou non dans le tableau components_data en fontion de l'indice passé en paramètre
    }
    function get_component_percentused(n) {
        return components_data[n]["percentUsed"];//Cherche un pourcentage utilisé dans le tableau components_data en fontion de l'indice passé en paramètre
    }

    return{
        //Simplification de l'écriture, on accèdera a ces fonctions par "module().fonction_retournée()"
        component_name: (n) => get_component_name(n), 
        component_needrecipe: (n) => get_component_needrecipe(n),
        component_price: (n) => get_component_price(n),
        component_type: (n) => get_component_type(n),
        component_bulk: (n) => get_component_bulk(n),
        component_percentused: (n) => get_component_percentused(n)
    }
})