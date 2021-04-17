let createTab = function (){
    function tabProducts (){
        let tabDisplayed = document.getElementById('tab_prod');
        for (let i = 0; i < products_data.length; i++){
            tabDisplayed.insertRow(i + 1);
            for (let j = 0; j < 3 ; j++){
                tabDisplayed.rows[i + 1].insertCell(j);
            }
            tabDisplayed.rows[i + 1].cells[0].innerText = products_data[i].name;
            tabDisplayed.rows[i + 1].cells[1].innerText = products_data[i].time;
            tabDisplayed.rows[i + 1].cells[2].innerText = products_data[i].components;
        }
    }
    function tabComp (){
        let display = document.getElementById('tab_comp');
        for (let ligne = 0; ligne < components_data.length; ligne++){
            display.insertRow(ligne + 1)
            for (let colonne = 0; colonne < 6; colonne++){
                display.rows[ligne + 1].insertCell(colonne);
            }
            display.rows[ligne + 1].cells[0].innerText = components_data[ligne].name;
            display.rows[ligne + 1].cells[1].innerText = ((Number(components_data[ligne].needRecipe)) ? "Yes" : "No");
            display.rows[ligne + 1].cells[2].innerText = components_data[ligne].price + ' €';
            display.rows[ligne + 1].cells[3].innerText = components_data[ligne].type;
            display.rows[ligne + 1].cells[4].innerText = ((Number(components_data[ligne].buyInBulk)) ? "Yes" : "No")
            display.rows[ligne + 1].cells[5].innerText = (Number(components_data[ligne].percentUsed) * 100) + ' %';
        }
    }
    return {
        displayTabProd: () => tabProducts(),
        displayTabComp: () => tabComp()
    }
};
