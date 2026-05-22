const express = require("express");
const router = express.Router();

const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ====================================
// TEST ROUTE
// ====================================

router.get("/", (req,res) => {

    res.send("Auth Route Working");

});


// ====================================
// REGISTER USER
// ====================================

router.post("/register", (req,res) => {

    // Get Data From Body
    const { name,email,password } = req.body;

    // Check Empty Fields
    if(!name || !email || !password){

        return res.status(400).json({

            message:"Please Fill All Fields"

        });

    }

    // Check Existing Email
    const checkUserSql = `
        SELECT * FROM users
        WHERE email = ?
    `;

    db.query(
        checkUserSql,
        [email],
        (error,results) => {

            // Database Error
            if(error){

                console.log(error);

                return res.status(500).json({

                    message:"Database Error"

                });

            }

            // Email Already Exists
            if(results.length > 0){

                return res.status(400).json({

                    message:"Email Already Exists"

                });

            }

            // Hash Password
            const hashedPassword =
                bcrypt.hashSync(password,10);

            // Insert User Query
            const insertSql = `
                INSERT INTO users
                (name,email,password)
                VALUES(?,?,?)
            `;

            // Save User
            db.query(

                insertSql,

                [
                    name,
                    email,
                    hashedPassword
                ],

                (error,result) => {

                    // Insert Error
                    if(error){

                        console.log(error);

                        return res.status(500).json({

                            message:"Registration Failed"

                        });

                    }

                    // Success
                    res.status(201).json({

                        message:"User Registered Successfully"

                    });

                }

            );

        }
    );

});


// ====================================
// LOGIN USER
// ====================================

router.post("/login", (req,res) => {

    // Get Login Data
    const { email,password } = req.body;

    // Validation
    if(!email || !password){

        return res.status(400).json({

            message:"Please Fill All Fields"

        });

    }

    // Find User
    const sql = `
        SELECT * FROM users
        WHERE email = ?
    `;

    db.query(sql,[email], (error,results) => {

        // Database Error
        if(error){

            console.log(error);

            return res.status(500).json({

                message:"Database Error"

            });

        }

        // User Not Found
        if(results.length === 0){

            return res.status(401).json({

                message:"Invalid Email Or Password"

            });

        }

        // User Data
        const user = results[0];

        // Compare Password
        const isMatch =
            bcrypt.compareSync(
                password,
                user.password
            );

        // Wrong Password
        if(!isMatch){

            return res.status(401).json({

                message:"Invalid Email Or Password"

            });

        }

        // Create Token
        const token = jwt.sign(

            {
                id:user.id,
                email:user.email
            },

            "secretkey",

            {
                expiresIn:"7d"
            }

        );

        // Login Success
        res.status(200).json({

            message:"Login Successful",

            token,

            user:{
                id:user.id,
                name:user.name,
                email:user.email
            }

        });

    });

});


// ====================================
// EXPORT ROUTER
// ====================================

module.exports = router;