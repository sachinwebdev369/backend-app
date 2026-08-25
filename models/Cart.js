const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "allproduct" },
    title: { type: String },
    price: { type: Number, },
    discountPercentage: { type: Number },
    brand: { type: String, },
    images: { type: [String], default: [] },
    qty: { type: Number, default: 1, required: [true, "Please Enter the quantity"], },
    createdAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model("mycart", cartSchema)