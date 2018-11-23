const jwt = require('jsonwebtoken');

//checks if the token from header is valid, then adds it to req.body.token
module.exports = (req, res, next) => {
    try {
        //let token = req.headers['x-access-token'] || req.headers['authorization'];
        let token = req.cookies.FitnessAppJWT;
        jwt.verify(token, process.env.JWT_KEY);
        req.token = token;
        next();
    } catch (error) {
        return res.redirect('/login');
    }
};

