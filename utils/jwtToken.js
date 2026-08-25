const sendToken = (user, statusCode, res) => { // for send cookie to client side
    const Token = user.getJWTToken();

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE *3* 24 * 60* 60 * 1000),
        httpOnly: true,
        sameSite: "none",
        secure: true,
    }

    res.status(statusCode).cookie("token", Token, options).json({success: true, user})
}

module.exports = sendToken