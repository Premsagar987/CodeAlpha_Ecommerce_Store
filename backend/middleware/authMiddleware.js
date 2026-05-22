// ================================
// IMPORT JWT
// ================================

const jwt = require("jsonwebtoken");


// ================================
// AUTH MIDDLEWARE
// ================================

const authMiddleware = (req,res,next) => {

    // Get Token From Header
    const token = req.header("Authorization");

    // Check Token
    if(!token){

        return res.status(401).json({

            message:"Access Denied"

        });

    }

    try{

        // Verify Token
        const verified = jwt.verify(
            token,
            "secretkey"
        );

        // Save User Data
        req.user = verified;

        // Continue
        next();

    }

    catch(error){

        res.status(400).json({

            message:"Invalid Token"

        });

    }

};


// ================================
// EXPORT MIDDLEWARE
// ================================

module.exports = authMiddleware;