const express = require('express');
const router = express.Router();
const checkToken = require('../middleware/checkToken');

/* GET home page. */
router.get('/', 
  (req,res,next) => {
    if(req.query.token !== undefined){
      const cookieOptions = {
        httpOnly:true,
        expires: 0
      }
      res.cookie('FitnessAppJWT',req.query.token.concat(''),cookieOptions);
      res.redirect('/user');
    } else {
      next();
    }
  },
  checkToken,
  (req, res, next) => {
    res.redirect('/user');
  });

module.exports = router;
