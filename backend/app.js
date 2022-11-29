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

const APIData = require("./APIcall2.js")

 // export the express app we created to make it available to other modules
 module.exports = app;