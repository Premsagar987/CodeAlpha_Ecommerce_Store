// ====================================
// IMPORT PACKAGES
// ====================================

const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

// ====================================
// DATABASE CONNECTION
// ====================================

require("./config/db");

// ====================================
// IMPORT ROUTES
// ====================================

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

// ====================================
// CREATE EXPRESS APP
// ====================================

const app = express();

// ====================================
// MIDDLEWARE
// ====================================

// Enable CORS
app.use(cors());

// Parse JSON Data
app.use(express.json());

// Upload Folder Access
app.use(
    "/uploads",
    express.static(
        path.join(__dirname,"uploads")
    )
);

// ====================================
// API ROUTES
// ====================================

// Auth Routes
app.use("/api/auth", authRoutes);

// Product Routes
app.use("/api/products", productRoutes);

// Cart Routes
app.use("/api/cart", cartRoutes);

// Order Routes
app.use("/api/orders", orderRoutes);

// ====================================
// TEST ROUTE
// ====================================

app.get("/", (req,res) => {

    res.send(
        "E-commerce Server Running Successfully"
    );

});

// ====================================
// 404 ROUTE
// ================================

app.use((req,res) => {

    res.status(404).json({
        message:"Route Not Found"
    });

});



// ========================================
// DEFINE PORT
// =====================================

const PORT = process.env.PORT || 5000;

// ================================
// START SERVER
// ===============================

app.listen(PORT, () => {
    console.log(
        `Server Running On Port ${PORT}`
    );

});