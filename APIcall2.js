let fetch = require('node-fetch');
let {Product} = require('./db.js');
//require('db.js');
console.log(Product);
//Item = mongoose.model('Item', Item);

function getAPIdata(barcode) {
    //check if barcode exists in database
    if (Product.exists({barcode: barcode})){
        //if it does, return the data
        return Product.findOne({barcode: barcode});
    }
    else{
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
    console.log(data.products[0].stores);
    pinkify(data);
            })
            .catch(err => { 
                throw err 
            });
}
}
getAPIdata("3614272049529");

function pinkify(data){
    //
    let price = averagePriceUSD(data);
    let barcode = data.products[0].barcode_number;
    let name = data.products[0].title;
    let description = data.products[0].description;
    let brand = data.products[0].brand;
    let category = data.products[0].category;
    let gender = data.products[0].gender;

    //create new mongoose object
    Product.create({barcode, name, description, price, category, brand, gender}, function (err, large) {
        if (err) return handleError(err);
        // saved!
      });
}

function averagePriceUSD(data){
    //for all stores in data
    let USDCounter = 0;
    let averagePrice = 0;
    let sum = 0;
    for(let i = 0; i < data.products[0].stores.length; i++){
        //get the price
        if(data.products[0].stores[i].currency == "USD"){
            //add the price to a sum
            sum += data.products[0].stores[i].price;
            //increment a counter
            USDCounter++;
            averagePrice = sum / USDCounter;
        }
    }
    //divide the sum by the number of stores
    return averagePrice;

}



//