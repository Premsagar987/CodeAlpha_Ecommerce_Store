const express = require("express");
const router = express.Router();


// ====================================
// IMPORT CONTROLLER
// ====================================

const {

    addToCart,

    getCartItems,

    removeCartItem,

    updateCartQuantity

} = require("../controllers/cartController");


// ====================================
// TEST ROUTE
// ====================================

router.get("/", (req,res) => {

    res.send("Cart Route Working");

});


// ====================================
// ADD TO CART
// ====================================

router.post("/add", addToCart);


// ====================================
// GET USER CART
// ====================================

router.get("/:user_id", getCartItems);


// ====================================
// UPDATE CART QUANTITY
// ====================================

router.put(
    "/update/:id",
    updateCartQuantity
);


// ====================================
// REMOVE CART ITEM
// ====================================

router.delete(
    "/remove/:id",
    removeCartItem
);


// ====================================
// EXPORT ROUTER
// ====================================

module.exports = router;