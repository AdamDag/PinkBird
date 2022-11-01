const mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs');


const Item = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String
});


MongoClient.connect(URLSlugs, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Item");
  var product = { name: name, description: description, price: price, category: category};
  dbo.collection("Products").insertOne(product, function(err, res) {
    if (err) throw err;
    console.log("Product added");
    db.close();
  });
});


//Item.plugin(passportLocalMongoose);
Item.plugin(URLSlugs('name'));

