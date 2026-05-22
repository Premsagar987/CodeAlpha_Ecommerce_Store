const express = require("express");
const router = express.Router();

const db = require("../config/db");


// ====================================
// GET ALL PRODUCTS
// ====================================

router.get("/", (req,res) => {

    // SQL Query
    const sql = `
        SELECT * FROM products
    `;

    // Execute Query
    db.query(sql, (error,results) => {

         // Database Error
        if(error){

            console.log(error);

            return res.status(500).json({

                message:"Database Error"

            });

        }

         // Send Products
        res.json(results);

    });

});

// ====================================
// EXPORT ROUTER
// ====================================

module.exports = router;