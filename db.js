const mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs');


const Item = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String
});


// Create a model object
const Product = mongoose.model('product', Item);

// To create connection to database
// mongoose.connect(,
// {  
//    useNewUrlParser: true,  
//    useUnifiedTopology: true,  
//    useFindAndModify: false
// });


//Item.plugin(passportLocalMongoose);
Item.plugin(URLSlugs('name'));

