const express = require("express") 
const router = express.Router()
const { isAuthenticate, isAdmin } = require("../middleware/auth")
const { createOrder, allOrders, getAllOrders, getaOrder, updateOrder } = require("../controllers/orderController")

router.route("/create-order").post(isAuthenticate, createOrder)
router.route("/all-orders-admin").post(isAuthenticate, allOrders)
router.route("/single-order-admin/:id").post(isAuthenticate, isAdmin("admin"), getaOrder)
router.route("/update-order-admin/:id").put(isAuthenticate, isAdmin("admin"), updateOrder)

module.exports = router