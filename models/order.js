const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    userData: { type: Object, required: [true, "Please Enter the userdata"] },
    shippingCharge: Number,
    cart: { type: Array, required: true, },
    orderStatus: { type: String, default: "processing", required: [true, "Please Enter the orderStatus Name"], },
    payment: { type: String, required: true, default: "Pay on delevery" },
    paidAt: { type: Date, },
    deliveredAt: { type: Date, },
    createdAt: { type: Date, default: Date.now(), },
})

module.exports = mongoose.model('myorder', orderSchema)