const jwt_decode = require('jwt-decode');

module.exports = (req,res,next) => {

    req.sequelize.models.Tokens.findOne({
        where: {
            token:req.token
        }
    })
    .then( user => {
        if(user === null){
            res.redirect('/login');
        } else {
            next();
        }
    });
};