const { default: mongoose } = require('mongoose');
let fetch = require('node-fetch');
let {Product} = require('./db.js');
//module.exports = {Product, getAPIdata, pinkify, averagePriceUSD, averagePriceCAD, pinkTaxCalc, averageCategoryPrice};

//require('db.js');
//console.log(Product);
//Item = mongoose.model('Item', Item);

const express = require("express")
const app = express() // instantiate an Express object
const {otherFunctions} = require("./functions.js")

const cors = require('cors');
app.use(cors());


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
    //const api_key = "vva9dg8tt9lljbuwsleah5ff4i2zdp";
    //const api_key = "d8zvuvrsz7d2asckeql07nwej1ow33";
    //const api_key = "20ldbyp1xo4qxg4yho6on1mr465qzf";
      const api_key = "pw31mmphm17b1tnkb1nbjoesz8chuk";
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
    pinkify(data).then(() => reCalculatePinkTax(data)).catch(err => console.log(err));
    //reCalculatePinkTax(data);
            })
            .catch(err => { 
                throw err 
            });
}
}

app.get('/alternatives', async function(req, res) {
    const { category, id } = req.query;
    const products = await Product.find({ category })

    res.json({
        products: products.filter((product) => {
            return (product._id.toString() !== id)
        })
    });
})
app.get('/ProductData', async function(req,res){
    const barcode = req.query.barcode;
    if (!barcode) {
        const products = await Product.find({})
        res.json({
            products
        })
    } else {
        const product = await getAPIdata(barcode);
        console.log("Product Recieved!")
        console.log("ProductData endpoint", product)
    
        res.json({
            product
        })
    }
})

//getAPIdata("079400260949");

console.log(getAPIdata("099584923317").then((data) => {
    console.log(data)
    }));
    

async function pinkify(data){
    let acp = await averageCategoryPrice(data);
    let image = data.products[0].images[0];
    console.log("IMAGE LINK", data.products[0].images[0]);
    let price = averagePriceUSD(data);
    let barcode = data.products[0].barcode_number;
    let name = data.products[0].title;
    let description = data.products[0].description;
    let brand = data.products[0].brand;
    let category = categorize(data);
    let gender = data.products[0].gender;
    let pinktax = pinkTaxCalc(data, acp);
    console.log(price, acp);
    let pinkTaxValue = parseFloat(price - acp).toFixed(2);
    

    
    //create new mongoose object
    return Product.create({barcode, name, description, price, category, brand, gender, pinktax, pinkTaxValue, image});
      //reCalculatePinkTax(data);
      //
      
}
async function reCalculatePinkTax(data){
    let productDb = await Product.find({category: categorize(data)});
    let acp = averageCategoryPrice2(data);
    if(productDb.length > 0){
        console.log(productDb.length);
        //add the data to the array
        for(let i = 0; i < productDb.length; i++){
            //console.log("TEST:" , data);
            //console.log("TEST 2", productDb);
            let pinkTax = pinkTaxCalc2(productDb[i], await acp);
            let pinkTaxValue = parseFloat(productDb[i].price - await acp).toFixed(2);
            console.log("name:", productDb[i].name)
            console.log("price", productDb[i].price, "ACP", await acp);
            console.log(pinkTaxValue);

        //update the database
            await Product.updateOne({barcode: productDb[i].barcode}, {pinktax: pinkTax, pinkTaxValue: pinkTaxValue});
            console.log("UPDATE");
               
        }
        console.log("test3", productDb[productDb.length-1])
        if(productDb[productDb.length-1].pinktax === true){
            alternatives(data);
        }
    }

}
async function alternatives(data){
    let productDb = await Product.find({category: categorize(data)});
    //initialize empty array of alternatives
    let alternatives = [];
    //sort the array by price low to high
    productDb.sort((a, b) => (a.price > b.price) ? 1 : -1);
    //add the first 10 items to the array
    for(let i = 0; i < 3; i++){
        alternatives.push(productDb[i]);
    }
    //return the array
console.log(alternatives);
    return alternatives;
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
    if(data.gender !== 'undefined'){
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
    //console.log(data.products[0].category);
    //console.log(data.products[0].title);
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
    if(catArray.length == undefined|| catArray.length == 0){
        averageCatPrice = averagePriceUSD(data);
        return averageCatPrice;
    }
    else{
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
    
}
function categorize(data){
    if(data.products[0].category.includes('Antiperspirant') || data.products[0].category.includes('Deodorant')|| data.products[0].category.includes('Anti-Perspirant') || data.products[0].title.includes('Antiperspirant') || data.products[0].title.includes('Deodorant')|| data.products[0].title.includes('Anti-Perspirant')){
        return 'Anti-Perspirant & Deodorant';
    }
    else if(data.products[0].category.includes('Shampoo') || data.products[0].category.includes('Conditioner')|| data.products[0].category.includes('Hair') || data.products[0].title.includes('Shampoo') || data.products[0].title.includes('Conditioner')|| data.products[0].title.includes('Hair')){
        return 'Shampoo & Conditioner';
    }
    else if(data.products[0].category.includes('Soap') || data.products[0].category.includes('Body Wash')|| data.products[0].category.includes('Bodywash') || data.products[0].title.includes('Soap') || data.products[0].title.includes('Body Wash')|| data.products[0].title.includes('Bodywash')){
        return 'Soap & Bodywash';
    }
    else{
        return 'Other';
    }


}

async function averageCategoryPrice2(data){
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
    if(catArray.length == undefined){
        averageCatPrice = averagePriceUSD(data);
        return averageCatPrice;
    }
    else{
    console.log(catArray.length);
    for (let i=0; i < catArray.length; i+=1){
        if(catArray[i].gender == 'male' || catArray[i].gender == 'unisex'){
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
}
function pinkTaxCalc2(data, acp){
    if(data.gender !== 'undefined'){
    if(data.gender === 'male' || data.gender === 'unisex'){
        return false;
    }
    else {
        if(data.price/acp >= 1.1){
            return true;
        }
        else{
            return false;
        }
    }
}
    else {
        if(data.price/acp >= 1.1){
            return true;
        }
        else{
            return false;
        }
    }

}

module.exports = app;
