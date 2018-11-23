module.exports = (req,res,next) => {
    req.sequelize.models.Users.findOne({
        attributes: [
            'email',
            'id'
        ],
        where: {
            email:req.email
        },
        
    })
    .then(User => {
        req.user = User;
        next();
    });
};