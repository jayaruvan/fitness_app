module.exports = (req, res, next) => {
    req.sequelize.models.Activities.findOne({
        where: {
            id: req.idToUpdate
        }
    }).then(activity => {
        if(activity !== null) {
            req.activity = activity.dataValues;
            next();
        } else {
            // show message to user -> cannot acces this activity
            res.redirect('/user');
        }
    });
};