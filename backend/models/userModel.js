// ================================
// IMPORT DATABASE
// ================================

const db = require("../config/db");


// ================================
// CREATE USER
// ================================

const createUser = (
    name,
    email,
    password,
    callback
) => {

    db.query(

        `INSERT INTO users
        (name,email,password)
        VALUES(?,?,?)`,

        [
            name,
            email,
            password
        ],

        callback

    );

};


// ================================
// FIND USER BY EMAIL
// ================================

const findUserByEmail = (
    email,
    callback
) => {

    db.query(

        `SELECT *
         FROM users
         WHERE email = ?`,

        [email],

        callback

    );

};

// ================================
// FIND USER BY ID
// ================================

const findUserById = (
    user_id,
    callback
) => {

    db.query(

        `SELECT id,name,email
         FROM users
         WHERE id = ? `,

        [user_id],

        callback

    );

};


// ================================
// GET ALL USERS
// ================================

const getAllUsers = (callback) => {

    db.query(

        `SELECT id,name,email
         FROM users`,

        callback

    );

};

// ================================
// DELETE USER
// ================================

const deleteUser = (
    user_id,
    callback
) => {

    db.query(

        `DELETE FROM users
         WHERE id = ?`,

        [user_id],

        callback

    );

};

// ================================
// EXPORT FUNCTIONS
// ================================

module.exports = {

    createUser,

    findUserByEmail,

    findUserById,

    getAllUsers,

    deleteUser

};