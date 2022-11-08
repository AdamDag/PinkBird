const mongoose = require("mongoose");
const productSchema = require("./db");

module.exports = mongoose.model("Product", ProductSchema);
