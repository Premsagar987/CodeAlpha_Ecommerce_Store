// ================================
// IMPORT DATABASE
// ================================

const db = require("../config/db");


// ================================
// GET ALL PRODUCTS
// ================================

exports.getAllProducts = (req,res) => {

    // Fetch Products
    db.query(

        "SELECT * FROM products",

        (error,results) => {

            // Database Error
            if(error){

                return res.status(500).json({

                    message:"Failed To Fetch Products"

                });

            }

            // Success
            res.status(200).json(results);

        }

    );

};


// ================================
// GET SINGLE PRODUCT
// ================================

exports.getSingleProduct = (req,res) => {

    // Product ID
    const product_id = req.params.id;

    // Fetch Product
    db.query(

        "SELECT * FROM products WHERE id = ?",

        [product_id],

        (error,results) => {

            // Database Error
            if(error){

                return res.status(500).json({

                    message:"Failed To Fetch Product"

                });

            }

            // Product Not Found
            if(results.length === 0){

                return res.status(404).json({

                    message:"Product Not Found"

                });

            }

            // Success
            res.status(200).json(results[0]);

        }

    );

};


// ================================
// ADD PRODUCT
// ================================

exports.addProduct = (req,res) => {

    // Get Data
    const {
        name,
        price,
        image,
        description
    } = req.body;

    // Check Empty Fields
    if(
        !name ||
        !price ||
        !image ||
        !description
    ){

        return res.status(400).json({

            message:"Please Fill All Fields"

        });

    }

    // Insert Product
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

        (error,result) => {

            // Database Error
            if(error){

                return res.status(500).json({

                    message:"Failed To Add Product"

                });

            }

            // Success
            res.status(201).json({

                message:"Product Added Successfully"

            });

        }

    );

};


// ================================
// UPDATE PRODUCT
// ================================

exports.updateProduct = (req,res) => {

    // Product ID
    const product_id = req.params.id;

    // Get Data
    const {
        name,
        price,
        image,
        description
    } = req.body;

    // Update Product
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

        (error,result) => {

            // Database Error
            if(error){

                return res.status(500).json({

                    message:"Failed To Update Product"

                });

            }

            // Success
            res.status(200).json({

                message:"Product Updated Successfully"

            });

        }

    );

};


// ================================
// DELETE PRODUCT
// ================================

exports.deleteProduct = (req,res) => {

    // Product ID
    const product_id = req.params.id;

    // Delete Product
    db.query(

        "DELETE FROM products WHERE id = ?",

        [product_id],

        (error,result) => {

            // Database Error
            if(error){

                return res.status(500).json({

                    message:"Failed To Delete Product"

                });

            }

            // Success
            res.status(200).json({

                message:"Product Deleted Successfully"

            });

        }

    );

};