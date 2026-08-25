const express = require("express") 
const { addToCart, getAllCart, updateCart, deleteCart } = require("../controllers/cartController")
const router = express.Router()
const { isAuthenticate } = require("../middleware/auth")

router.route("/add-to-cart").put(isAuthenticate,addToCart)
router.route("/get-all-cart").get(isAuthenticate, getAllCart)
router.route("/update-cart/:id").post(isAuthenticate, updateCart)
router.route("/delete-cart/:id").delete(isAuthenticate, deleteCart)


module.exports = router