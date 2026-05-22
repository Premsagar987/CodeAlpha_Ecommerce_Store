// ================================
// IMPORT DATABASE
// ================================

const db = require("../config/db");


// ================================
// PLACE ORDER
// ================================

exports.placeOrder = (req,res) => {

    // Get Data
    const {
        user_id,
        total_amount,
        address,
        payment_method
    } = req.body;

    // Check Empty Fields
    if(
        !user_id ||
        !total_amount ||
        !address ||
        !payment_method
    ){

        return res.status(400).json({

            message:"Please Fill All Fields"

        });

    }

    // Insert Order
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

        (error,result) => {

            // Database Error
            if(error){

                return res.status(500).json({

                    message:"Failed To Place Order"

                });

            }

            // Success
            res.status(201).json({

                message:"Order Placed Successfully"

            });

        }

    );

};


// ================================
// GET USER ORDERS
// ================================

exports.getUserOrders = (req,res) => {

    // User ID
    const user_id = req.params.user_id;

    // Get Orders
    db.query(

        "SELECT * FROM orders WHERE user_id = ?",

        [user_id],

        (error,results) => {

            // Database Error
            if(error){

                return res.status(500).json({

                    message:"Failed To Fetch Orders"

                });

            }

            // Success
            res.status(200).json(results);

        }

    );

};


// ================================
// GET SINGLE ORDER
// ================================

exports.getSingleOrder = (req,res) => {

    // Order ID
    const order_id = req.params.id;

    // Get Order
    db.query(

        "SELECT * FROM orders WHERE id = ?",

        [order_id],

        (error,results) => {

            // Database Error
            if(error){

                return res.status(500).json({

                    message:"Failed To Fetch Order"

                });

            }

            // Order Not Found
            if(results.length === 0){

                return res.status(404).json({

                    message:"Order Not Found"

                });

            }

            // Success
            res.status(200).json(results[0]);

        }

    );

};


// ================================
// DELETE ORDER
// ================================

exports.deleteOrder = (req,res) => {

    // Order ID
    const order_id = req.params.id;

    // Delete Order
    db.query(

        "DELETE FROM orders WHERE id = ?",

        [order_id],

        (error,result) => {

            // Database Error
            if(error){

                return res.status(500).json({

                    message:"Failed To Delete Order"

                });

            }

            // Success
            res.status(200).json({

                message:"Order Deleted Successfully"

            });

        }

    );

};