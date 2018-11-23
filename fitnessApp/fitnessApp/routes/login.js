var express = require('express');
var router = express.Router();
const loginUser = require('../database/controllers/user/loginUser');
module.exports = (sequelize) =>{
    // get for login
    router.get('/', (req, res, next) => {
        
            if(req.query.failedAuth === 'true'){
                res.render('login', { title: 'Login', authFailed: true, userCreated: false});
            }else{
                if(req.query.userCreated === 'true') {
                    res.render('login', {title: 'Login', authFailed: false, userCreated: true})
                }else {
                    res.render('login', { title: 'Login', authFailed: false , userCreated: false});
                }
            }
        });
    router.post('/',(req, res, next) => {
            let authObject = {email:req.body.email, password:req.body.password};
            if(authObject.email.length < 1){
                return res.redirect('/login');
            } else {
                req.sequelize = sequelize;
                req.authObject = authObject;
                next();
            }
        },
        loginUser.verify,
        loginUser.clearInvalidTokens,
        loginUser.signToken,
        (req,res,next)=>{
            res.redirect('/?token='.concat(req.token));
        });
      return router;
}

