const express = require("express");
const router = express.Router();


// ====================================
// IMPORT CONTROLLER
// ====================================

const {

    placeOrder,

    getUserOrders,

    getSingleOrder,

    deleteOrder

} = require("../controllers/orderController");


// ====================================
// TEST ROUTE
// ====================================

router.get("/", (req,res) => {

    res.send("Order Route Working");

});


// ====================================
// PLACE ORDER
// ====================================

router.post("/place", placeOrder);


// ====================================
// GET USER ORDERS
// ====================================

router.get(
    "/user/:user_id",
    getUserOrders
);


// ====================================
// GET SINGLE ORDER
// ====================================

router.get(
    "/:id",
    getSingleOrder
);


// ====================================
// DELETE ORDER
// ====================================

router.delete(
    "/delete/:id",
    deleteOrder
);


// ====================================
// EXPORT ROUTER
// ====================================

module.exports = router;