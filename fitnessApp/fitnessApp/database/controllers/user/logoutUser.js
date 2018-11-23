const jwt = require('jsonwebtoken');

module.exports.deleteToken = (req,res,next) => {
    req.sequelize.models.Tokens.destroy({
        where: {
            token:req.token
        }
    });
    next();
};
