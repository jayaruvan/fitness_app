module.exports = (req,res,next) => {
    console.log("accessing db for creating new activity");
        let activityObj = req.activityObj;
    if(activityObj.duration.length < 1 ||
        activityObj.dateAndTime.length < 1 || 
        activityObj.activityType.length < 1) {
        res.redirect('/user');
    } else {

        req.sequelize.models.Activities.create({
            activityType: activityObj.activityType,
            description: activityObj.description,
            duration: activityObj.duration,
            dateAndTime: activityObj.dateAndTime,
            place: activityObj.place,
            userId: req.user.id
        })
        .then(newActivity =>{
    
            next();
        });
    }
};


