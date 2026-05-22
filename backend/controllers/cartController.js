// ================================
// IMPORT DATABASE
// ================================

const db = require("../config/db");


// ================================
// ADD TO CART
// ================================

exports.addToCart = (req,res) => {

    // Get Data
    const {
        user_id,
        product_id,
        quantity
    } = req.body;

    // Check Empty Fields
    if(!user_id || !product_id || !quantity){

        return res.status(400).json({

            message:"Please Fill All Fields"

        });

    }

    // Insert Cart Item
    db.query(

        "INSERT INTO cart(user_id,product_id,quantity) VALUES(?,?,?)",

        [user_id,product_id,quantity],

        (error,result) => {

            // Database Error
            if(error){

                return res.status(500).json({

                    message:"Failed To Add Cart"

                });

            }

            // Success
            res.status(201).json({

                message:"Product Added To Cart"

            });

        }

    );

};


// ================================
// GET CART ITEMS
// ================================

exports.getCartItems = (req,res) => {

    // User ID
    const user_id = req.params.user_id;

    // Get Cart Data
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

        (error,results) => {

            // Database Error
            if(error){

                return res.status(500).json({

                    message:"Failed To Fetch Cart"

                });

            }

            // Success
            res.status(200).json(results);

        }

    );

};


// ================================
// REMOVE CART ITEM
// ================================

exports.removeCartItem = (req,res) => {

    // Cart ID
    const cart_id = req.params.id;

    // Delete Item
    db.query(

        "DELETE FROM cart WHERE id = ?",

        [cart_id],

        (error,result) => {

            // Database Error
            if(error){

                return res.status(500).json({

                    message:"Failed To Remove Item"

                });

            }

            // Success
            res.status(200).json({

                message:"Item Removed Successfully"

            });

        }

    );

};


// ================================
// UPDATE CART QUANTITY
// ================================

exports.updateCartQuantity = (req,res) => {

    // Cart ID
    const cart_id = req.params.id;

    // Quantity
    const {quantity} = req.body;

    // Update Quantity
    db.query(

        "UPDATE cart SET quantity = ? WHERE id = ?",

        [quantity,cart_id],

        (error,result) => {

            // Database Error
            if(error){

                return res.status(500).json({

                    message:"Failed To Update Quantity"

                });

            }

            // Success
            res.status(200).json({

                message:"Cart Updated Successfully"

            });

        }

    );

};