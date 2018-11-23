const bcrypt = require('bcryptjs');
module.exports = (req, res, next)=>{
    let password1 = req.body.password1;
    let password2 = req.body.password2;
    let email = req.body.email;
    if(email===''){
        return res.redirect('/register?validEmail=false');
    }
    if(password1.length < 6) {
        return res.redirect('/register?validPassword=false');
    }
    if(password1 !== password2){
        return res.redirect('/register?passwordMatch=false');
    } 
    let password = password1;
    
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            password = hash;
            req.sequelize.models.Users.findOne({
                attributes: ['email'],
                where: {
                    email: email            
                }
            }).then(user => {
               if(user === null) {
                    req.sequelize.models.Users.create({
                        email: email,
                        password: password,           
                    })
                    .then(newUser =>{
                        next();
                    });
                } else {
                    return res.redirect('/register?emailTaken=true');
               }
            });
            
        });
    });
    
};