const catchAsyncError = require("../middleware/catchAsyncError");
const Cart = require("../models/Cart")
const ErrorHandler = require("../utils/ErrorHandler")

// for send all cart from database
exports.getAllCart = catchAsyncError(async (req, res, next) => { 
  try {
    const CartItem = await Cart.find({ userId: req.user.id }).sort({createdAt: 1})
    if (!CartItem) {
      return next(new ErrorHandler("Cart Item is Empty", 400))
    }
    res.status(200).json({success: true, cart: CartItem})
} catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})

// add cart items in database
exports.addToCart = catchAsyncError(async (req, res, next) => {
  try {
    const cart = await Cart.create({ ...req.body, userId: req.user.id })
    res.status(200).json({ success: true, cart })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})

// update cart item data in database
exports.updateCart = catchAsyncError(async (req, res, next) => {
  const urlId = req.params.id
  const { qty } = req.body
  try {
    let getItem = await Cart.findById(urlId)
    if (!getItem) {
      return next(new ErrorHandler("Item not found", 400))
    }
    if (!qty) {
      return next(new ErrorHandler("quantity is undefinde", 400))
    }
    if (qty >= 1) {
      getItem = await Cart.findByIdAndUpdate(req.params.id, { $set: { qty } }, { new: true })
    }
    res.status(201).json({ success: true, updateItem: getItem, message: "success fully updated" })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})

// delete cart from db
exports.deleteCart = catchAsyncError(async (req, res, next) => {
  try {
    const urlId = req.params.id
    let getItem = await Cart.findById(urlId)
    if (!getItem) {
      return next(new ErrorHandler(" not found", 400))
    }
    if (getItem.userId.toString() !== req.user.id) {
      return next(new ErrorHandler("Not Allowed!", 401))
    }
    await Cart.findByIdAndDelete(urlId)
    res.status(201).json({ success: true, message: "success fully deleted" })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})