const express = require('express');
const router = express.Router();
const logoutUser = require('../database/controllers/user/logoutUser');
const checkTokenInDb = require('../database/controllers/user/checkTokenInDb');
const checkToken = require('../middleware/checkToken');

module.exports = (sequelize) => {
    router.get('/', checkToken,// check if logged in -> middleware with token,
        (req, res, next) => {
            req.sequelize = sequelize;            
            next();
        },
        checkTokenInDb,
        logoutUser.deleteToken,
        (req,res,next) => {
            res.redirect('/login');
        }
    ); 
    return router;
};


