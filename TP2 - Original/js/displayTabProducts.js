//Module qui crée le tableau
let create_product_tab = (function (){
    function create_tab(){
        for (let i = 0; i < 6; i++){//6 car 6 produits à exposer
            create_product_line().display_line(i);//On crée les différenes lignes du tableau 
        }
    }
    return {
        display_tab: () => create_tab()
    }
})