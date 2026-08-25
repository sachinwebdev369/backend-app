const Product = require("../models/productModel")
const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandlar = require("../utils/errorHandler")
const cloudinary = require("cloudinary")


// delete product from db
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product is not found with this id", 404));
        }
        await Product.findByIdAndDelete({ _id: req.params.id })
        res.status(201).json({ success: true, message: "Product Deleted successfully!", });
    } catch (error) {
        return next(new ErrorHandlar(error.message, 400));
    }
});

// create new product data in db
exports.createProduct = catchAsyncError(async (req, res, next) => {
    try {
        const { title, description, price, discountPercentage, stock, brand, category, returnPolicy, wrrantyInformation, tags } = req.body
        let images = [];
        if (typeof req.body.images === "string") { images.push(req.body.images) }
        else { images = req.body.images }
        const imagesLinks = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], { folder: "products", });
            imagesLinks.push(result.secure_url);
        }
        const product = await Product.create({ title, description, price, discountPercentage, stock, brand, category, images: imagesLinks, returnPolicy, wrrantyInformation, tags });

        res.status(201).json({ success: true, product });
    }
    catch (err) {
        return next(new ErrorHandlar(`Product creation error: ${err.message}`, 404))
    }
})


// get all product from db and send to client side
exports.getAllProduct = catchAsyncError(async (req, res, next) => {
    try {
        const { name, description, minPrice, maxPrice, rating, category, numOfReviews, createAt, sort } = req.query;
        const urlQuery = {}

        if (name) urlQuery.name = { $regex: name, $options: 'i' }
        if (description) urlQuery.description = { $regex: description, $options: 'i' }
        if (category) {
            const categories = category.split(",");
            urlQuery.category = { $in: categories };
        }
        if (rating) urlQuery.rating = { "$gte": rating }
        if (maxPrice && minPrice) {
            urlQuery.price = { "$gte": minPrice, "$lte": maxPrice }
        }
        let myQueryLength = Product.find(urlQuery).countDocuments()
        let myQuery = Product.find(urlQuery)
        if (sort) {
            const sortFix = sort.split(",").join(" ")
            myQuery = myQuery.sort(sortFix)
        }

        let page = Number(req.query.pageNo) || 1
        let limit = Number(req.query.limit) || 20
        let skip = (page - 1) * limit
        myQuery = myQuery.skip(skip).limit(limit)

        const getAllProduct = await myQuery
        const totalProduct = await Product.find({}).countDocuments()
        console.log(totalProduct)
        res.status(200).json({ totalProduct, searchProductLength: getAllProduct.length, data: getAllProduct })
        next()
    }
    catch (err) {
        return next(ErrorHandlar("Product not found", 404))
    }
})

const techs = ["laptops", "smartphones", "lighting", "motorcycle", "sunglasses",]
const others = ["automotive", "fragrances", "furniture", "groceries", "home-decoration", "skincare", "tops"]
const mens = ["men's clothing","mens-shirts","mens-shoes","mens-watches"]
const womens = ["women's clothing","womens-bags","womens-dresses","womens-jewellery","womens-shoes","womens-watches"]

// send category products
exports.getCategoryProduct = catchAsyncError(async (req, res) => {
    try {
        let myProductCategory = {}
        let mensProduct = []
        for (let men of mens) {
            let myproduct = await Product.find({ category: men })
            for (let myPct of myproduct) {
                mensProduct.push(myPct)
            }
        }
        let womensProduct = []
        for (let women of womens) {
            let myproduct = await Product.find({ category: women })
            for (let myPct of myproduct) {
                womensProduct.push(myPct)
            }
        }
        let techProduct = []
        for (let tech of techs) {
            let myproduct = await Product.find({ category: tech })
            for (let myPct of myproduct) {
                techProduct.push(myPct)
            }
        }
        let otherProduct = []
        for (let other of others) {
            let myproduct = await Product.find({ category: other })
            for (let myPct of myproduct) {
                otherProduct.push(myPct)
            }
        }
        myProductCategory = { mensProduct, womensProduct, techProduct, otherProduct }

        res.json({ mensResult: mensProduct.length, womensResult: womensProduct.length, techResult: techProduct.length, otherResult: otherProduct.length, status: "done", myProductCategory })
    }
    catch (error) {
        return next(ErrorHandlar(error.message, 400))
    }
})

// get single product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandlar("Product not found", 404))
    }
    res.status(200).json({ success: true, product })
})



// update single product 
exports.updateProduct = catchAsyncError(async (req, res, next) => {
   const urlId = req.params.id
    const getProduct = await Product.findById(urlId)
    if (getProduct) {
        return next(new ErrorHandlar("Product not found", 404))
    }
  if (!req.body) {
      return next(new ErrorHandler("data is undefinde", 400))
    }

    const updatedProduct = await Product.findByIdAndUpdate(urlId, { $set: { ...req.body } }, { new: true })

    res.status(200).json({ success: true, updatedProduct })
})