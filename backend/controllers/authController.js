// ================================
// IMPORT PACKAGES
// ================================

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const db = require("../config/db");


// ================================
// REGISTER USER
// ================================

exports.registerUser = async (req,res) => {

    // Get User Data
    const {name,email,password} = req.body;

    // Check Empty Fields
    if(!name || !email || !password){

        return res.status(400).json({

            message:"Please Fill All Fields"

        });

    }

    try{

        // Check Existing User
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (error,results) => {

                // Database Error
                if(error){

                    return res.status(500).json({

                        message:"Database Error"

                    });

                }

                // User Exists
                if(results.length > 0){

                    return res.status(400).json({

                        message:"Email Already Exists"

                    });

                }

                // Hash Password
                const hashedPassword =
                    await bcrypt.hash(password,10);

                // Insert User
                db.query(
                    "INSERT INTO users(name,email,password) VALUES(?,?,?)",
                    [name,email,hashedPassword],
                    (error,result) => {

                        // Insert Error
                        if(error){

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

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            message:"Server Error"

        });

    }

};


// ================================
// LOGIN USER
// ================================

exports.loginUser = (req,res) => {

    // Get Data
    const {email,password} = req.body;

    // Check Empty Fields
    if(!email || !password){

        return res.status(400).json({

            message:"Please Fill All Fields"

        });

    }

    // Check User
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (error,results) => {

            // Database Error
            if(error){

                return res.status(500).json({

                    message:"Database Error"

                });

            }

            // User Not Found
            if(results.length === 0){

                return res.status(400).json({

                    message:"Invalid Email Or Password"

                });

            }

            // User Data
            const user = results[0];

            // Compare Password
            const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

            // Password Incorrect
            if(!isMatch){

                return res.status(400).json({

                    message:"Invalid Email Or Password"

                });

            }

            // Create Token
            const token = jwt.sign(

                {
                    id:user.id
                },

                "secretkey",

                {
                    expiresIn:"7d"
                }

            );

            // Success
            res.status(200).json({

                message:"Login Successful",

                token

            });

        }
    );

};