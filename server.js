const app = require("./app")
const connectDB = require("./config/db")
const cloudinary = require("cloudinary")
const port = process.env.PORT || 8001

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
}) 

connectDB(process.env.DB_URL)

app.listen(port, ()=> console.log(`http://localhost:${port}`))