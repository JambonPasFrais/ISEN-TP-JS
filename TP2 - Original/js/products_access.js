//Création du module produit. Son but est de récupérer les différentes informations stockées dans products-data.js
let product = function (){
    //Toutes les informations récoltées ont pour but d'être transférées sur telle ou telle colonne du tableau de index.html
    function get_product_name(n){//On commence par le nom du produit en fonction de l'indice
        return products_data[n]["name"];
    }
    function get_product_time(n){//On prend le temps que met le produit à être réalisé
        return products_data[n]["time"];
    }
    function get_product_components_name(n){//On cherche les noms des composants du produit
        let longueur_tab_product = products_data[n]["components"].length;
        let product_components_name = Array (longueur_tab_product);//Utilisation d'un tableau pour stocker les composants
        for (let i = 0; i <  longueur_tab_product; i++){
            let indice = products_data[n]["components"][i];
            product_components_name[i] = " " + component().component_name(indice);//Utilisation du components_access.js + un espace pour l'affichage
        }
        return product_components_name;//On retourne le tableau
    }
    function get_product_components_price(n){//On cherche le prix total du produit
        let product_components_price = 0;
        for (let i = 0; i <  products_data[n].components.length; i++){
            let indice = products_data[n].components[i];
            //On stocke le prix au fur et à mesure des itérations. La formule varie en fonction du type du composant
            if (component().component_type(Number(indice)) === 'tool'){
                product_components_price += Number(component().component_price(indice));
            }
            else{
                product_components_price += Number(component().component_price(indice)) * Number(component().component_percentused(indice));
            }
        }

        return product_components_price;//A la fin de la boucle on retourne le prix total du produit
    }
    function get_product_components_recipe(n){//On cherche si les composants du produit ont besoin d'un récipient ou non
        let longueur_tab_product = products_data[n]["components"].length;
        let product_components_recipe = 0
        for (let i = 0; i < longueur_tab_product; i++){
            let indice = products_data[n]["components"][i];
            if(component().component_needrecipe(indice) === 1){//On les additionne au fur et à mesure.
                product_components_recipe += 1;
            }
        }
        return product_components_recipe;//On renvoit le nombre total de récipient
    }
    function get_product_components_bulk(n){//On cherche si tous les produits sont trouvables "en vrac" ou non
        let longueur_tab_product = products_data[n]["components"].length;
        let product_components_bulk = 0;
        for (let i = 0; i < longueur_tab_product; i++){
            let indice = products_data[n]["components"][i];
            product_components_bulk += component().component_needrecipe(indice);
        }
        if (product_components_bulk === 0) {
            return "Oui";//Oui si tous trouvables "en vrac"
        }
        else {
            return "Non";//Non si pas tous trouvables "en vrac"
        }
    }

    return {
        //On simplifie l'écriture et on accède au fonction plus aisément à partir de "module().fonction_simplifiée(variable)"
        product_name: (n) => get_product_name(n),
        product_time: (n) => get_product_time(n),
        product_components_name: (n) => get_product_components_name(n),
        product_price: (n) => get_product_components_price(n),
        product_recipe: (n) => get_product_components_recipe(n),
        product_bulk: (n) => get_product_components_bulk(n)
    }
}