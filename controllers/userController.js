const User = require("../models/userModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const sendToken = require("../utils/jwtToken")
const cloudinary = require("cloudinary")


// create user in db
exports.createUser = catchAsyncError(async (req, res, next) => {
  try {
    const { name, email, password, address, phoneNumber } = req.body;
    const userEmail = await User.findOne({ email })
    if (userEmail) {
      return next(new ErrorHandler("user already exits", 400))
    }
    let user = await User.create({name, email, password,address, phoneNumber})

    res.status(200).json({success: true,user})
  }
  catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})


// delete user data from db
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(
        new ErrorHandler("User is not available with this id", 400)
      );
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(201).json({success: true,message: "User deleted successfully!",});
  }
  catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})


// register new user in db
exports.registerUser = catchAsyncError(async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const userEmail = await User.findOne({ email })
    if (userEmail) {
      return next(new ErrorHandler("user already exits", 400))
    }
    const user = await User.create({name, email, password})
    sendToken(user, 200, res)
  } catch (err) {
    res.status(400).json({ "erroris": err })
    console.log(err)
  }})


// login user 
exports.loginUser = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please provide the all fields!", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 400));
    }
    const isPasswordValid = await user.comparePassword(password);
    sendToken(user, 201, res)
  } catch (err) {
    res.status(400).json({ "error_is:": err })
    console.log(err)
  }
})


// get single user details
exports.getuser = catchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400))
    }
    res.status(200).json({
      success: true, user
    })
  } catch (err) {
    res.status(400).json({ "error_is:": err })
    console.log(err)
  }
})

// update user info
exports.updateUserInfo = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password, phoneNumber, name, address } = req.body
    let user = await User.findOne({ email }).select("+password")
    if (!user) {
      return next(new ErrorHandler("user Not Found", 400))
    }
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return next(new ErrorHandler("Please provide the correct information", 400))
    }
    user = await User.findByIdAndUpdate(user._id, { $set: { name, phoneNumber, address } }, { new: true })
    res.status(201).json({ success: true, user })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})


// update user's password
exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password")
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400))
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password doesn't matched with each other!", 400))
    }
    user.password = req.body.newPassword
    await user.save()
    res.status(200).json({success: true,message: "password updated successfully!"})
  }
  catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})


// remove cookie from client side
exports.logout = catchAsyncError(async (req, res, next) => {
  try {
    res.status(201).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true }).json({ success: true, message: "Log out successful!" })
  } catch (err) {
    return next(new ErrorHandler(err.message, 500))
  }
})


// get all user
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  try {
    let page = Number(req.query.pageNo) || 1
    let limit = Number(req.query.limit) || 10
    let skip = (page - 1) * limit

    const users = await User.find().skip(skip).limit(limit)
    const usersLength = await User.find().countDocuments()
    res.status(200).json({success: true,users,usersLength})
  }
  catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
})


// get single user details
exports.singleUserDetails = catchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id)
    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400))
    }
    res.status(200).json({success: true, user})
  } catch (err) {
    res.status(400).json({ "error_is:": err })
  }
})



// get single user details
exports.updateUser = catchAsyncError(async (req, res, next) => {
  const urlId = req.params.id
  try {
    const user = await User.findById(urlId)
    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400))
    }

    
  const updatedUser = await User.findByIdAndUpdate(urlId, { $set: { ...req.body } }, { new: true })

    res.status(200).json({success: true, user})
  } catch (err) {
    res.status(400).json({ "error_is:": err })
  }
})


