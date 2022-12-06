function categorize(data){
    if(data.products[0].category.includes('Antiperspirant') || data.products[0].category.includes('Deodorant')|| data.products[0].category.includes('Anti-Perspirant') || data.products[0].title.includes('Antiperspirant') || data.products[0].title.includes('Deodorant')|| data.products[0].title.includes('Anti-Perspirant')){
        return 'Anti-Perspirant & Deodorant';
    }
    else if(data.products[0].category.includes('Shampoo') || data.products[0].category.includes('Conditioner')|| data.products[0].category.includes('Hair') || data.products[0].title.includes('Shampoo') || data.products[0].title.includes('Conditioner')|| data.products[0].title.includes('Hair')){
        return 'Shampoo & Conditioner';
    }

}

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

// FUNCTION: alternatives
// INPUT: database, category (string)
// PROCESSING: 2 auxiliary lists. Push all products from desired
// category to a list and sort it. Place 3 lowest priced products
// in a new list.
// OUTPUT: List of 3 lowest priced products from category
async function alts(data, category){

    // Auxiliary arrays
    const products = await Product.find({category: categorize(data)})
    const alternatives = []

    // sorting products based on increasing price
    products.sort((a, b) => (a.price > b.price) ? 1 : -1);

    for(let i = 0; i < 3; i++){
        alternatives.push(products[i]);
    }

    //return the array
    console.log(alternatives);
    return alternatives;

// FUNCTION: generalSort
// INPUT: array
// PROCESSING: Insertion sort
// OUTPUT: Sorted array in increasing order
function generalSort(data){
    for (let i = 1; i < data.length; i++){

        let temp = data[i].price;
        let j;
    
        for (j = i - 1; j >= 0 && data[j].price > temp; j--){
            data[j + 1] = data[j];
        }
        
        data[j + 1].price = temp;
    }

    return data;
}

// FUNCTION: pinkTax
// INPUT: array of male products, array of male products,
// product to be checked
// PROCESSING: Takes average price of male and female products
// from same category. Set base tax as ration between the male 
// and female averages. Final pink tax is the average of the base
// pink tax and pink tax of the product compared to male group.
// OUTPUT: Pink tax of the product
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

// FUNCTION: productsOfShame
// INPUT: database
// PROCESSING: 2 auxiliary array. push all products with a pink
// tax to an array and sort it. Put 10 highest pink taxed products
// in an array.
// OUTPUT: 10 highest pink taxed products in database
async function productsOfShame(data){

    // Auxiliary arrays
    let products = await Product.find({category: categorize(data)});
    const shameList = [];

    // Sorting array of products by pink tax
    products.sort((a, b) => (a.pinkTax > b.pinkTax) ? 1 : -1);

    // Saving 10 highest pink taxed products
    for(let i = 0; i < 10; i++){
        shameList.push(products[i]);
    }

    //return the array
    console.log(shameList);
    return shameList;
}


// FUNCTION: sortByTax
// INPUT: array
// PROCESSING: Insertion sort based on pink tax of a product
// OUTPUT: sorted array of products based on pink tax
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

// FUNCTION: categoriesOfShame
// INPUT: database
// PROCESSING: Push all products with a pink tax to a list.
// Push all the categories represented by those products to a list.
// Find the average pink tax of each category, add each average
// pink tax to a new list, where each pink tax value is in the
// corresponing array index for the category names array. Sort
// the category names list and average pink tax list by average
// pink tax value for the category.
// OUTPUT: 3 highest pink taxed categories and their value
async function categoriesOfShame(data){

    // Auxiliary arrays
    let products = await Product.find({category: categorize(data)});
    const objectList = [];
    const categoryList = [];
    const categoryAvgTax = [];

    // Sorting array of products by pink tax
    products.sort((a, b) => (a.pinkTax > b.pinkTax) ? 1 : -1);

    // Auxiliary array

    let totalTax = 0;
    let counter = 0;

    // Making list of all pink taxed products
    for (var i = 0; i < products.length; i++){
        if (products[i].pinktax == true){
            objectList.push(products[i]);
        }
    }

    // Making list of all category names represented in the pink
    // taxed products list
    for (var i = 0; i < objectList.length; i++){
        
        if (!categoryList.includes(objectList[i].category)){
            categoryList.push(objectList[i].category);
        }
    }

    // Finding the average pink tax in each category and putting
    // the values in a list
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

    // Sorting categories based on their average pink tax
    const temp = sortCatByTax(categoryList, categoryAvgTax);

    // Format of this array is: [catName1, catTax1, catName2, catTax2,...]
    const shameList = [];

    // Finding 3 highest pink tax categories
    for (var i = temp.length - 2; i >= temp.length - 6; i - 2){
        shameList.push(temp[i]);
        shameList.push(temp[i+1]);
    }

    //return the array
    console.log(shameList);
    return shameList;
}

// FUNCTION: sortCatByTax
// INPUT: 2 arrays: categories and avg pink tax per category
// PROCESSING: Insertion sort based on avg pink tax for each category
// OUTPUT: Sorted array in format[catName1, catTax1, catName2, catTax2,...]
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

// FUNCTION: brandsOfShame
// INPUT: database
// PROCESSING: Push all products with a pink tax to a list.
// Push all the brands represented by those products to a list.
// Find the average pink tax of each brand, add each average
// pink tax to a new list, where each pink tax value is in the
// corresponing array index for the brand names array. Sort
// the brand names list and average pink tax list by average
// pink tax value for the brand.
// OUTPUT: Sorted array in format[brandName1, brandTax1, brandName2, brandTax2,...]
async function brandsOfShame(data){

    // Auxiliary arrays
    let products = await Product.find({category: categorize(data)});
    const objectList = [];
    const brandsList= [];
    const brandAvgTax = [];

    let totalTax = 0;
    let counter = 0;

    // Making list of all pink taxed products
    for (var i = 0; i < products.length; i++){
        if (products[i].pinktax == true){
            objectList.push(products[i]);
        }
    }

    // Making list of all brands represented in the pink taxed list
    for (var i = 0; i < objectList.length; i++){
        
        if (!brandsList.includes(objectList[i].brand)){
            brandsList.push(objectList[i].brand);
        }
    }

    // Finding average pink tax of each brand
    for (var i = 0; i < brandsList.length; i++){

        totalTax = 0;
        counter = 0;

        for (var j = 0; j < objectList.length; i++){
            if (objectList[j].brand == brandsList[i]){
                totalTax = totalTax + objectList[j].pinkTaxValue;
                counter++;
            }
        }

        brandAvgTax.push(totalTax/counter);
    }

    // format[brandName1, brandTax1, brandName2, brandTax2,...]        
    const temp = sortCatByTax(brandsList, brandAvgTax);

    const shameList = [];

    // Finding 3 highest pink tax brand
    for (var i = temp.length - 2; i >= temp.length - 6; i - 2){
        shameList.push(temp[i]);
        shameList.push(temp[i+1]);
    }

    //return the array
    console.log(shameList);
    return shameList;
}

// FUNCTION: sortBrandByTax
// INPUT: 2 arrays: banks and avg pink tax per brand
// PROCESSING: Insertion sort based on avg pink tax for each brand
// OUTPUT: Sorted array in format[brandName1, brandTax1, brandName2, brandTax2,...]
function sortBrandByTax(brands, brandTax){

    const outputList = [];
    
    for (let i = 1; i < brandTax.length; i++){

            let temp = brandTax[i];
            let j;
        
            for (j = i - 1; j >= 0 && brandTax[j] > temp; j--){
                brandTax[j + 1] = brandTax[j];
                brands[j + 1] = brands[j];
            }
            
            brandTax[j + 1] = temp;
    }

    for (let i = 1; i < brandTax.length; i++){

        outputList.push(brands[i]);
        outputList.push(brandTax[i].toString());

    }

    return outputList;
}


