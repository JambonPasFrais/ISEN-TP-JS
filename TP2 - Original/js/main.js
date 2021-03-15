//module qui affiche nos tableaux
let create_world = (function (){
    function components (){//Tableau de composants
        return create_component_tab().display_tab();
    }
    function products(){//Tableau de produits
        return create_product_tab().display_tab();
    }
    return {
        //Accès rapide via une balise "script" dans le HTML
        display_components: () => components(),
        display_products: () => products()
    }
})