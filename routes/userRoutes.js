const express = require("express")
const { registerUser, loginUser, getuser, updateUserInfo, updateUserPassword, logout, getAllUser, singleUserDetails, updateAvatar, createUser, deleteUser, updateUser } = require("../controllers/userController")
const { isAuthenticate, isAdmin } = require("../middleware/auth")
const router = express.Router()

router.route("/create-user").post(createUser)
router.route("/delete-user/:id").delete(deleteUser)
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/get-user").post(isAuthenticate, getuser)
router.route("/update-user-info").post(isAuthenticate, updateUserInfo)
router.route("/update-user-password").put(isAuthenticate, updateUserPassword)
router.route("/logout").delete(logout)
// router.route("/update-avatar").put(isAuthenticate, updateAvatar)
router.route("/get-all-user").get(isAuthenticate, isAdmin("admin"), getAllUser)
router.route("/view-single-user-details").post(isAuthenticate, isAdmin("admin"), singleUserDetails)
router.route("/update-user-admin/:id").put(isAuthenticate, isAdmin("admin"), updateUser)

module.exports = router