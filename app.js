const express = require("express")
const app = express()
const cors = require("cors") 
const cookieParser = require("cookie-parser")

const order = require("./routes/orderRoute")
const cart = require("./routes/cartRoutes")
const user = require("./routes/userRoutes")
const product = require("./routes/productRoutes")
const bodyParser = require("body-parser")
const errorMiddleware = require("./middleware/error")

require("dotenv").config({path: "config/.env"})

app.use(express.json({limit: '50mb'}))
app.use(cookieParser());
app.use(cors({origin: ['http://localhost:5173'],credentials: true}));
app.set("trust proxy",1)

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb',extended: false}))

// routes
app.use('/api/v1/user', user)  //----
app.use('/api/v1/product', product)
app.use('/api/v1/cart', cart)
app.use('/api/v1/order', order)  // -----

app.get('/', (req, res) => {res.send("this is sachin")})

// Middleware for error
app.use(errorMiddleware);

module.exports = app