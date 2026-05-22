// ================================
// IMPORT MYSQL PACKAGE
// ================================

const mysql = require("mysql2");


// ================================
// DATABASE CONNECTION
// ================================

const db = mysql.createConnection({

    host:"localhost",

    user:"root",

    password:"123abcPrem@",

    database:"ecommerce_db"

});


// ================================
// CONNECT DATABASE
// ================================

db.connect((error) => {

    // Connection Failed
    if(error){

        console.log(
            "Database Connection Failed"
        );

        console.log(error);

    }

    // Connection Success
    else{

        console.log(
            "MYSQL Connected Successfully"
        );

    }

});


// ================================
// EXPORT DATABASE
// ================================

module.exports = db;