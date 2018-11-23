module.exports = (req,res,next) => {
    req.sequelize.models.Users.findAll({
        attributes: [
            'email'
        ],
        where: {
            id: req.user.id,
        },
        include: [{
            model: req.sequelize.models.Activities,
            attributes:[
                'id',
                'activityType',
                'description',
                'duration',
                'dateAndTime',
                'place'
            ],
            where: {
                activityType: req.activityType
            },
            required: true
        }]
    })
    .then(activities => {
        let array = [];
        activities.forEach(element => {

            element.Activities.forEach(element =>{
                array.push(element.dataValues);
            });
        });
        
        req.numberOfPages = Math.ceil(array.length/5);
        req.activities = array;
        next();
    });
};