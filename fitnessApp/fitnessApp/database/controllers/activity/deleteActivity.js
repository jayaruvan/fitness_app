module.exports = (req,res,next) => {
    req.sequelize.models.Activities.findOne({
        where: {
            id: req.idToDelete,
            userId: req.user.id
        }
    }).then(activity => {
        if(activity !== null){
            req.sequelize.models.Activities.destroy({
                where: {
                    id: req.idToDelete
                }
            });
            next();
        } else {
            //show message for user -> cannot delete that activity 
            res.redirect('/user');
        }
        
    } );
};