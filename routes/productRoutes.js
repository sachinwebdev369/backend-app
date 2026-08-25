 const express = require("express")
const { getAllProduct, getCategoryProduct, getProductDetails, createProduct, deleteProduct, updateProduct } = require("../controllers/productController")
 const router = express.Router()
const { isAuthenticate, isAdmin } = require("../middleware/auth")

 router.route("/create-product").post(createProduct)
 router.route("/delete-product/:id").delete(deleteProduct)
 router.route("/all-products").get(getAllProduct)
 router.route("/category-products").get(getCategoryProduct)
 router.route("/single-product/:id").get(getProductDetails)
router.route("/update-product-admin/:id").put(isAuthenticate, isAdmin("admin"), updateProduct)

module.exports = router
