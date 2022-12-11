const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://PinkEagle:PinkBird2022@littlebird1.cjyq3cs.mongodb.net/?retryWrites=true&w=majority');
  console.log("made it");
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

let ProductSchema = new mongoose.Schema({
barcode: String,
  name: String,
  description: String,
  price: Number,
  category: String,
  brand: String,
  gender: String,
  pinktax: Boolean,
  pinkTaxValue: Number,
  image: String
});


//Item.plugin(passportLocalMongoose);
//Item.plugin(URLSlugs('name'));


let Product = mongoose.model('Product', ProductSchema);

module.exports = {
  Product: Product
};
