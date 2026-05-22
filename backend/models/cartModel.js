// ================================
// IMPORT DATABASE
// ================================

const db = require("../config/db");


// ================================
// ADD TO CART
// ================================

const addCartItem = (
    user_id,
    product_id,
    quantity,
    callback
) => {

    db.query(

        `INSERT INTO cart
        (user_id,product_id,quantity)
        VALUES(?,?,?)`,

        [
            user_id,
            product_id,
            quantity
        ],

        callback

    );

};


// ================================
// GET USER CART
// ================================

const getCartItems = (
    user_id,
    callback
) => {

    db.query(

        `SELECT
            cart.id,
            products.name,
            products.price,
            products.image,
            cart.quantity
         FROM cart
         JOIN products
         ON cart.product_id = products.id
         WHERE cart.user_id = ?`,

        [user_id],

        callback

    );

};


// ================================
// UPDATE QUANTITY
// ================================

const updateCartQuantity = (
    cart_id,
    quantity,
    callback
) => {

    db.query(

        `UPDATE cart
         SET quantity = ?
         WHERE id = ?`,

        [
            quantity,
            cart_id
        ],

        callback

    );

};


// ================================
// DELETE CART ITEM
// ================================

const deleteCartItem = (
    cart_id,
    callback
) => {

    db.query(

        "DELETE FROM cart WHERE id = ?",

        [cart_id],

        callback

    );

};


// ================================
// EXPORT FUNCTIONS
// ================================

module.exports = {

    addCartItem,

    getCartItems,

    updateCartQuantity,

    deleteCartItem

};