const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Please Enter the Product Name"], trim: true },
    description: { type: String, required: [true, "Please Enter the description "] },
    price: {
        type: Number, required: [true, "Please Enter the price"],
        maxLength: [8, "Price cannot excee 8 characters"]
    },
    discountPercentage: { type: Number, maxLength: [3, "Price cannot excee 3 characters"] },
    rating: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    brand: { type: String, },
    images: { type: [String], default: [] },
    category: { type: String, required: [true, "please enter Product category"] },
    stock: { type: Number, required: [true, "please enter Stock number"], maxLength: [4, "Stock can't exceed 4 cheracter"], default: 1 },
    returnPolicy: { type: Number, default: 0 },
    wrrantyInformation: { type: Number, default: 0 },
    reviews: [{
        reviewerName: { type: String, },
        reviewerEmail: { type: String, },
        rating: { type: Number, },
        comment: { type: String, },
    }],
    createdAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model("allproduct", productSchema)