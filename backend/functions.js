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
