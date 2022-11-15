const express = require("express")
const app = express() // instantiate an Express object
const product_data =require("./db.js")

// import and instantiate express
const bodyParser = require('body-parser');

const cors = require('cors');
app.use(cors());

// import some useful middleware
const multer = require("multer")
const axios = require("axios") // middleware for making requests to APIs
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require("morgan")


app.get('/ProductData', function(req,res){
    let products = [];

    for(let i = 0; i<product_data.length;i++){
            products[i] = [
                product_data[i].barcode,
                product_data[i].name,
                product_data[i].description,
                product_data[i].price,
                product_data[i].category,
                product_data[i].brand,
                product_data[i].gender
            ]   
    }

    res.send({
        products:products
    })

})


 // export the express app we created to make it available to other modules
 module.exports = app;