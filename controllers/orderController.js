const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandlar = require("../utils/errorHandler")
const Order = require("../models/order")

// create new order data in db
exports.createOrder =  catchAsyncError(async (req, res, next) => {
    try {
  const { cart, shippingAddress, payment, userData } = req.body;
      const orders = []
      for (const item of cart) {
        const order = await Order.create({cart: item,userData,payment,shippingCharge: 3,userId: req.user._id})
      orders.push(order)
    }
    res.status(200).json({ success: true, orders })
} catch (error) {
      return next(new ErrorHandlar(error.message, 400));
    }
  });

// fetch all order from db and to client side
exports.allOrders =  catchAsyncError(async (req, res, next) => {
    try {
    const orders = await Order.find({ userId: req.user.id, orderStatus: { $ne: "deleverd" } }).sort("-createdAt")
    if (!orders) {
      return next(new ErrorHandler("Orders  is Empty", 400))
    }
    res.status(200).json({
      success: true, orders
    })
} catch (error) {
      return next(new ErrorHandlar(error.message, 400));
    }
  });

  
// get single order  
exports.getaOrder = catchAsyncError(async (req, res, next) => {
    const urlId = req.params.id
    try {
      let getorder = await Order.findById(urlId)
      if (!getorder) {
        return next(new ErrorHandlar('Not found', 404))
      }
      res.status(200).json({
        success: true, getorder
      })
    } catch (error) {
      return next(new ErrorHandlar(error.message, 500));
    }
  })
  
//update order in db
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const urlId = req.params.id
  const { orderStatus } = req.body
  if (!orderStatus) {
    return res.status(400).json({ error: "orderStatus is undefinde" })
  }
  try {
    let getItem = await Order.findById(urlId)

    if (!getItem) {
      return res.status(404).json({ status: 'Not found' })
    }

    if (orderStatus == "deleverd") {
      getItem = await Order.findByIdAndUpdate(urlId, { $set: { orderStatus, payment: "Paid" } }, { new: true })
    } else {
      getItem = await Order.findByIdAndUpdate(urlId, { $set: { orderStatus } }, { new: true })
    }

    res.status(200).json({
      success: true, getItem
    })
  } catch (error) {
    return next(new ErrorHandlar(error.message, 500));
  }
})  