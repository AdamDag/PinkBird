const mongoose = require('mongoose'),
URLSlugs = require('mongoose-url-slugs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


<<<<<<< Updated upstream
const Item = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String
});
=======
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  console.log ("Connected to MongoDB");
  var dbo = db.db("pinkbirdDB");
  var product = { barcode: barcode, names: names, description: description, price: price, category: category};
  dbo.collection("Products").insertMany(product, function(err, res) {
    if (err) throw err;
    console.log("Product added");
    db.close();
  });
});

const Product = new mongoose.Schema({
    barcode: String,
    name: String,
    description: String,
    price: Number,
    category: String,
    brand: String
});




>>>>>>> Stashed changes
//Item.plugin(passportLocalMongoose);
//Item.plugin(URLSlugs('name'));

