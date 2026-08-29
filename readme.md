# 🛒 MERN Stack E-Commerce Website

A full-stack **E-Commerce Web Application** built using the **MERN
Stack** with separate features for **Users and Admin**.

but we will expore backend part here <br>
frontend part github link:  [frontend-app](https://github.com/sachinwebdev369/frontend-app)


The application provides a complete online shopping experience where
users can register, browse products, search and filter products, manage
their cart, place orders, and view their order history. The admin panel
allows administrators to manage products, users, orders, and view
dashboard statistics.

## 📌 Project Overview

This project is a complete e-commerce platform with two main sections:

-   👤 **User Panel**
-   🛠️ **Admin Panel**

The frontend is developed using **React.js**, while the backend uses
**Node.js and Express.js**. **MongoDB** is used as the database.


## 🏗️ Technology Stack


### Backend

-   Node.js
-   Express.js
-   Mongoose
-   JSON Web Token (JWT)
-   bcryptjs
-   Nodemailer
-   Cloudinary
-   CORS
-   Cookie-parser
-   Crypto

### Database

-   MongoDB


## 📂 Project Structure

``` text
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
    └── README.md
```




## 🔐 Security

The project includes:

-   Password hashing using **bcryptjs**
-   JWT-based authentication
-   Protected routes
-   Admin authorization
-   Cookie-based authentication where implemented
-   CORS configuration
-   Input validation
-   Environment variables for sensitive configuration
-   Secure API access




## ⚙️ Installation and Setup

### 1. Clone the Repository

``` bash
git clone https://github.com/sachinwebdev369/backend-app.git
cd backend-app
```

### 2. Backend Setup

``` bash
cd backend-app
npm install
```

Create a `.env` file:

``` env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

```

Start the backend:

``` bash
npm run dev
```

or:

``` bash
npm start
```



## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on
GitHub.
