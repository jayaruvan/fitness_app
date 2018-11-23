module.exports = (req,res,next) => {
    console.log("accessing db for update");
    req.sequelize.models.Activities.update(
        {
            activityType: req.updateObj.activityType,
            description: req.updateObj.description,
            duration: req.updateObj.duration,
            dateAndTime: req.updateObj.dateAndTime,
            place: req.updateObj.place
        },
        {   
            where: {
                id: req.idToUpdate,
                userId: req.user.id
            }
        }
    ).then(() => {
        
        next();
    });
};