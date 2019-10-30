var mongoose = require("mongoose")

var product = new mongoose.Schema({
    name: String,
    image: String,
    price: Number
})

module.exports = mongoose.model("Product", product)