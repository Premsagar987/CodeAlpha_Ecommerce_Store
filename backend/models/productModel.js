// ================================
// IMPORT DATABASE
// ================================

const db = require("../config/db");


// ================================
// GET ALL PRODUCTS
// ================================

const getAllProducts = (callback) => {

    db.query(

        "SELECT * FROM products",

        callback

    );

};


// ================================
// GET SINGLE PRODUCT
// ================================

const getSingleProduct = (
    product_id,
    callback
) => {

    db.query(

        `SELECT *
         FROM products
         WHERE id = ?`,

        [product_id],

        callback

    );

};


// ================================
// ADD PRODUCT
// ================================

const addProduct = (
    name,
    price,
    image,
    description,
    callback
) => {

    db.query(

        `INSERT INTO products
        (name,price,image,description)
        VALUES(?,?,?,?)`,

        [
            name,
            price,
            image,
            description
        ],

        callback

    );

};


// ================================
// UPDATE PRODUCT
// ================================

const updateProduct = (
    product_id,
    name,
    price,
    image,
    description,
    callback
) => {

    db.query(

        `UPDATE products
         SET name = ?,
             price = ?,
             image = ?,
             description = ?
         WHERE id = ?`,

        [
            name,
            price,
            image,
            description,
            product_id
        ],

        callback

    );

};


// ================================
// DELETE PRODUCT
// ================================

const deleteProduct = (
    product_id,
    callback
) => {

    db.query(

        `DELETE FROM products
         WHERE id = ?`,

        [product_id],

        callback

    );

};


// ================================
// EXPORT FUNCTIONS
// ================================

module.exports = {

    getAllProducts,

    getSingleProduct,

    addProduct,

    updateProduct,

    deleteProduct

};