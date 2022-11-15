//Create a function that compares a price with the average price of the products in the array
function averagePrice(products) {
    //Create a variable to store the sum of the prices
    let sum = 0;
    //Create a variable to store the average price
    let average = 0;
    //Loop through the array of products
    for (let i = 0; i < products.length; i++) {
        //Add the price of each product to the sum
        sum += products[i].price;
    }
    //Divide the sum by the number of products to get the average price
    average = sum / products.length;
    //Return the average price
    return average;
}

function comparePrice(price, average){
    //Create a variable to store the difference between the price and the average
    let difference = 0;
    //If the price is greater than the average
    if (price > average) {
        //Calculate the difference between the price and the average
        difference = price - average;
        //Return the difference
        return difference;
    }
    //If the price is less than the average
    else if (price < average) {
        //Calculate the difference between the price and the average
        difference = average - price;
        //Return the difference
        return difference;
    }
    //If the price is equal to the average
    else {
        //Return 0
        return 0;
    }

}


function alternatives(products){

    // Finding average price of alternatives
    let altPriveAvg = averagePrice(products);

    // Setting upper and lower bounds for the average price of alternatives
    let lowerRange = altPriceAvg*0.8;
    let upperRange = altPriceAvg*1.8;
    
    // List of alternative products
    const alternatives = [];

    // Iterating throgh list of alternative products
    for (let i = 0; i < products.length; i++){
        if (products[i].gender != "male"){

            // Adding product to list if it fits criteria
            if ((products[i].price >= lowerRange) && (products[i].price <= upperRange)){
                alternatives.push(products[i]);
            }

            else continue;
        }

        else continue;
    }

    return alternatvies;
}

function pinkTax(maleProducts, femaleProducts, product){
    
    // Calculating the average price of male and female subcategories
    let avgMalePrice = averagePrice(maleProducts);
    let avgFemalePrice = averagePrice(femaleProducts);

    // Calculating the base pink tax in a product cateogry
    let basePinkTax = (avgFemalePrice/avgMalePrice)*100;

    // Pink tax on this product is the average of the base pink tax
    // and the pink tax on the product compared to male products 
    // in the same product category
    let finalPinkTax = (((product.price/avgMalePrice)*100)+basePinkTax)/2;
    return finalPinkTax;
}


function productsOfShame(data){

    const objectList = [];

    for (var i = 0; i < data.length; i++){
        if (data[i].pinktax){
            objectList.push(data[i]);
        }
    }

    objectList = sortByTax(objectList);

    const shameList = [];

    for (var i = objectList.length - 1; i >= objectList.length - 10; i--){
        shameList.push(objectList[i]);
    }

    return shameList;
}


function sortByTax(data){
    
    for (let i = 1; i < data.length; i++){

        if (data[i].pinktax){

            let temp = data[i].pinkTaxValue;
            let j;
        
            for (j = i - 1; j >= 0 && data[j].pinkTaxValue > temp; j--){
                data[j + 1] = data[j];
            }
            
            data[j + 1].pinkTaxValue = temp;
        }
    }

    return data;
}


function categoriesOfShame(data){

    const objectList = [];
    const categoryList = [];
    const categoryAvgTax = [];

    let totalTax = 0;
    let counter = 0;

    for (var i = 0; i < data.length; i++){
        if (data[i].pinktax){
            objectList.push(data[i]);
        }
    }

    for (var i = 0; i < objectList.length; i++){
        
        if (!categoryList.includes(objectList[i].category)){
            categoryList.push(objectList[i].category);
        }
    }

    for (var i = 0; i < categoryList.length; i++){

        totalTax = 0;
        counter = 0;

        for (var j = 0; j < objectList.length; i++){
            if (objectList[j].categery == categoryList[i]){
                totalTax = totalTax + objectList[j].pinkTaxValue;
                counter++;
            }
        }

        categoryAvgTax.push(totalTax/counter);
    }

    const temp = sortCatByTax(categoryList, categoryAvgTax);

    const shameList = [];

    for (var i = temp.length - 2; i >= temp.length - 6; i - 2){
        shameList.push(temp[i]);
        shameList.push(temp[i+1]);
    }

    return shameList;
}


function sortCatByTax(categories, catTax){

    const outputList = [];
    
    for (let i = 1; i < catTax.length; i++){

            let temp = catTax[i];
            let j;
        
            for (j = i - 1; j >= 0 && catTax[j] > temp; j--){
                catTax[j + 1] = catTax[j];
                categories[j + 1] = categories[j];
            }
            
            catTax[j + 1] = temp;
    }

    for (let i = 1; i < catTax.length; i++){

        outputList.push(categories[i]);
        outputList.push(catTax[i].toString());

    }

    return outputList;
}





