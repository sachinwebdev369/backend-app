const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name: { type: String, require: [true, "Please enter your name"], maxLength: [30, "Name cannot exceed 30 characters"], minLength: [3, "Name should be more than 3 characters"] },
    email: { type: String, require: [true, "Please Enter your Email"], unique: true },
    password: { type: String, require: [true, "Please Enter Your Password"], minLength: [3, "password should  be greater than 8 Characters"], select: false },
    avatar: {
        public_id: { type: String, },
        url: { type: String, },
    },
    address: { type: String },
    phoneNumber: { type: Number },
    role: { type: String, default: "user" },
    createdAt: { type: Date, default: Date.now },
})

userSchema.pre("save", async function (next) { // handler for set password
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJWTToken = function () { // return jwt signature
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

userSchema.methods.comparePassword = async function (password) { // for comparing passord
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("User", userSchema)