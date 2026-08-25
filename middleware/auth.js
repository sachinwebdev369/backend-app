 const ErrorHandler = require("../utils/errorHandler")
 const catchAsyncError = require("./catchAsyncError")
 const jwt = require("jsonwebtoken")
 const User = require("../models/userModel")

 // authenticate user
 exports.isAuthenticate = catchAsyncError( async (req, res, next) => {
     const {token} = req.cookies;
     if(!token) {
         return next(new ErrorHandler("Please login to continue", 401))
     }
     const decoded = jwt.verify(token, process.env.JWT_SECRET)
     req.user = await User.findById(decoded.id)
     next();
 })


 // authenticate admin
 exports.isAdmin = (...roles) => {
     return (req, res, next) => {
         if(!roles.includes(req.user.role)) {
             return next(new ErrorHandler(`${req.user.role} can not access this resources!`))
         }
         next();
     }
 }