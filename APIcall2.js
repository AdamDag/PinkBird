const { default: mongoose } = require('mongoose');
let fetch = require('node-fetch');
let {Product} = require('./db.js');
//module.exports = {Product, getAPIdata, pinkify, averagePriceUSD, averagePriceCAD, pinkTaxCalc, averageCategoryPrice};

//require('db.js');
//console.log(Product);
//Item = mongoose.model('Item', Item);

async function getAPIdata(barcode) {
    //check if barcode exists in database
    
    if ((await Product.find({barcode: barcode})).length > 0){
        //if it does, return the data
        
        //console.log("exists");
        let existingProduct = await Product.find({barcode: barcode});
        console.log(existingProduct);
        //console.log('here');
        return existingProduct;

    }
    else{
        console.log('here i am');
    //if it doesn't, get the data from the API
    //const proxyurl = "https://pinkbird.herokuapp.com/"; // Use a proxy to avoid CORS error
    const api_key = "vva9dg8tt9lljbuwsleah5ff4i2zdp";
    //const barcode = document.getElementById("barcode").value;
    //CONCATENATE BARCODE WITH URL
    const url = "https://api.barcodelookup.com/v3/products?barcode="+barcode+"&formatted=y&key=" + api_key;
    fetch(url, {
        headers: {
            'Accept': 'application/json',}})
            .then(response => response.json())
            .then((data) => {
   console.log(averagePriceUSD(data));
    //console.log(data.products[0].stores);
    pinkify(data);
            })
            .catch(err => { 
                throw err 
            });
}
}
//getAPIdata("079400260949");

console.log(getAPIdata("079400472502").then((data) => {
    console.log(data)
    }));
    

async function pinkify(data){
    let acp = await averageCategoryPrice(data);

    let price = averagePriceUSD(data);
    let barcode = data.products[0].barcode_number;
    let name = data.products[0].title;
    let description = data.products[0].description;
    let brand = data.products[0].brand;
    let category = categorize(data);
    let gender = data.products[0].gender;
    let pinktax = pinkTaxCalc(data, acp);
    console.log(price, acp);
    let pinkTaxValue = price - acp;
    

    
    //create new mongoose object
    await Product.create({barcode, name, description, price, category, brand, gender, pinktax, pinkTaxValue}, function (err, large) {
        if (err) return handleError(err);
        // saved!
        console.log("CREATE");
      });
}

function averagePriceUSD(data){
    //for all stores in data
    let USDCounter = 0;
    let averagePrice = 0;
    let sum = 0;
    for(let i = 0; i < data.products[0].stores.length; i++){
        //get the price
        if(data.products[0].stores[i].currency == 'USD'){
            //add the price to a sum
            sum += parseFloat(data.products[0].stores[i].price);
            //console.log(typeof data.products[0].stores[i].price);
            //increment a counter
            USDCounter++;
            unroundedAveragePrice = sum / USDCounter;
            averagePrice = unroundedAveragePrice.toFixed(2);

        }
        if (USDCounter == 0){
            averagePrice = averagePriceCAD(data);
        }
    }
    //divide the sum by the number of stores
    return averagePrice;

}
function averagePriceCAD(data){
    //for all stores in data
    let CADCounter = 0;
    let averagePrice = 0;
    let sum = 0;
    for(let i = 0; i < data.products[0].stores.length; i++){
        //get the price
        if(data.products[0].stores[i].currency == 'CAD'){
            //add the price to a sum
            sum += parseFloat(data.products[0].stores[i].price);
            //console.log(typeof data.products[0].stores[i].price);
            //increment a counter
            CADCounter++;
            unroundedAveragePrice = sum / CADCounter;
            averagePrice = (unroundedAveragePrice*0.75).toFixed(2);

        }
    }
    //divide the sum by the number of stores
    return averagePrice;

}

function pinkTaxCalc(data, acp){
    if(data.gender === 'male' || data.gender === 'unisex'){
        return false;
    }
    else {
        if(averagePriceUSD(data)/acp >= 1.1){
            return true;
        }
        else{
            return false;
        }
    }

}

async function averageCategoryPrice(data){
    //access database
    //find all products in the same category

    //get the average price of all items in that category
    let sumCatPrice = 0;
    let catCounter = 0;
    let catArray = [];
    console.log(data.products[0].category);
    console.log(data.products[0].title);
    //console.log(productdb);
    //console.log(data.category);
    //console.log(data.name);
    if ((await Product.find({category: categorize(data)})).length > 0){
        //add the data to the array

        catArray = await Product.find({category: categorize(data)}); 
        console.log("FIND");
    }
    else{
        /*
    for(let i = 0; i < data.products.length; i++){
        if(data.products[i].category === data.category){
            catArray.push(data.products[i]);
        }
        */
        //await(Product.find({category: data.products[i].category}))
    }
    //console.log(data.category)
    console.log(catArray.length);
    for (let i=0; i < catArray.length; i+=1){
        if(catArray[i].pinktax == false){
            sumCatPrice += parseFloat(catArray[i].price);
            catCounter+=1;
        }
    }

    let averageCatPrice = sumCatPrice / catCounter;
    //return the average price of all items in that category
    console.log(catCounter);
    console.log(sumCatPrice);
    console.log(averageCatPrice);
    return averageCatPrice;
}
function categorize(data){
    if(data.products[0].category.includes('Antiperspirant') || data.products[0].category.includes('Deodorant')|| data.products[0].category.includes('Anti-Perspirant') || data.products[0].title.includes('Antiperspirant') || data.products[0].title.includes('Deodorant')|| data.products[0].title.includes('Anti-Perspirant')){
        return 'Anti-Perspirant & Deodorant';
    }
    else if(data.products[0].category.includes('Shampoo') || data.products[0].category.includes('Conditioner')|| data.products[0].category.includes('Hair') || data.products[0].title.includes('Shampoo') || data.products[0].title.includes('Conditioner')|| data.products[0].title.includes('Hair')){
        return 'Shampoo & Conditioner';
    }


}
//