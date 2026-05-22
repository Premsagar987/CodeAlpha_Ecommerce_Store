// ================================
// IMPORT DATABASE
// ================================

const db = require("../config/db");

// ================================
// CREATE ORDER
// ================================

const createOrder = (
    user_id,
    total_amount,
    address,
    payment_method,
    callback
) => {

    db.query(

        `INSERT INTO orders
        (user_id,total_amount,address,payment_method)
        VALUES(?,?,?,?)`,

        [
            user_id,
            total_amount,
            address,
            payment_method
        ],

        callback

    );

};


// ================================
// GET USER ORDERS
// ================================

const getUserOrders = (
    user_id,
    callback
) => {

    db.query(

        `SELECT *
         FROM orders
         WHERE user_id = ?`,

        [user_id],

        callback

    );

};


// ================================
// GET SINGLE ORDER
// ================================

const getSingleOrder = (
    order_id,
    callback
) => {

    db.query(

        `SELECT *
         FROM orders
         WHERE id = ?`,

        [order_id],

        callback

    );

};


// ================================
// DELETE ORDER
// ================================

const deleteOrder = (
    order_id,
    callback
) => {

    db.query(

        `DELETE FROM orders
         WHERE id = ?`,

        [order_id],

        callback
    );

};



// ================================
// EXPORT FUNCTIONS
// ================================

module.exports = {
    createOrder,
    getUserOrders,
    getSingleOrder,
    deleteOrder
};
