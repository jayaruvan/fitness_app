const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const registerUser = require('../database/controllers/user/registerUser');

module.exports = (sequelize)=> {
        // get for register
        router.get('/',(req, res, next) => {
            let bodyParameters = {
                title:'Register', 
                passwordsNotMatch: false, 
                emailTaken:false,
                validEmail:false,
                validPassword: false
            };
                
                if (req.query.validEmail === 'false') {
                    bodyParameters.validEmail = true;
                    return res.render('register', bodyParameters)
                }
                if (req.query.validPassword === 'false') {
                    bodyParameters.validPassword = true;
                    return res.render('register', bodyParameters)
                }
                if (req.query.passwordMatch === 'false') {
                    bodyParameters.passwordsNotMatch = true;
                    res.render('register', bodyParameters);
               } else {
                    if(req.query.emailTaken === 'true') {
                        bodyParameters.emailTaken = true;
                        res.render('register', bodyParameters);
                    } else {
                        res.render('register' ,bodyParameters);
                    }
                }           
        });

        // post for creating new user
        router.post('/', (req, res, next) => {
            
            req.sequelize = sequelize;
            next();
            
        },
        registerUser,
        (req,res,next) => {
            res.redirect('/login?userCreated=true');
        });
        return router;
    };



