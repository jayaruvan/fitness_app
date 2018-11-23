const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.verify = (req, res, next)=>{
    let authObj = req.authObject;
    req.sequelize.models.Users.findOne({
        attributes: [
            'id',
            'email',
            'password'
        ],
        where: {
            email:authObj.email
        }
    })
    .then(user => {
        if(user === null) {
            return res.redirect('/login?failedAuth=true');
        } else {
            bcrypt.compare(authObj.password,user.password, (err, result) =>{
                if(result){
                    console.log('prihlasenie uspesne');
                } else {
                    
                    return res.redirect('/login?failedAuth=true');
                   
                }
            });
            req.user = user;
            next();
        }
    });    
};

module.exports.clearInvalidTokens = (req, res, next) => {
    req.sequelize.models.Users.findAll({
        attributes:[
            'id'
        ],
        where: {
            id: req.user.id
        },
        include:[{
            model: req.sequelize.models.Tokens,
            attributes: [
                'token'
            ],
            required: true
        }]
    })
    .then(users=>{
        users.forEach(element => {
            let token = element.token;
            try{
                jwt.verify(token, process.env.JWT_KEY);
            } catch (error) {
                req.sequelize.models.Tokens.destroy({
                    where: {
                        token: token
                    }
                });
            }    
        });   
        next(); 
    });
};

module.exports.signToken = (req, res, next)=>{
    const token = jwt.sign({
        email: req.body.email
    },
    process.env.JWT_KEY, {
        expiresIn: '2h'
    });
    
    req.sequelize.models.Tokens.create({
        token:token,
        fk_id:req.user.id
    }).then(newToken => {
        //console.log(newToken);
    });
    req.token = token;
    next(); 
};