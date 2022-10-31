const mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs');


const Item = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String
});
//Item.plugin(passportLocalMongoose);
Item.plugin(URLSlugs('name'));

