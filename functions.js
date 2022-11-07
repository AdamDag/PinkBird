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
        if (products[i].gender == "female"){

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

function pinkTax(maleProducts, femaleProdcuts, product){
    
    // Calculating the average price of male and female subcategories
    let avgMalePrice = averagePrice(maleProdcuts);
    let avgFemalePrice = averagePrice(femaleProdcuts);

    // Calculating the base pink tax in a product cateogry
    let basePinkTax = (avgFemalePrice/avgMalePrice)*100;

    // Pink tax on this product is the average of the base pink tax
    // and the pink tax on the product compared to male products 
    // in the same product category
    let finalPinkTax = (((product.price/avgMalePrice)*100)+basePinkTax)/2;
    return finalPinkTax;
}


