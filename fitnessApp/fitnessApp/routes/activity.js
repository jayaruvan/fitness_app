const express = require('express');
const router = express.Router();
const checkToken = require('../middleware/checkToken');
const checkTokenInDb = require('../database/controllers/user/checkTokenInDb');
const jwtDecoder = require('jwt-decode');
const getUser = require('../database/controllers/user/getUser');
const getPageActivities = require('../middleware/getPageActivities');
const getActivitiesByType = require('../database/controllers/activity/getActivitiesByType');
const createNewActivity = require('../database/controllers/activity/createActivity');
module.exports = sequelize => {

    // get empty form for creating new activity - endpoint
    router.get('/new',
    checkToken,
    (req,res,next) => {
        let decoded = jwtDecoder(req.token);
        req.email = decoded.email;
        req.sequelize = sequelize;
        next();
    },
    checkTokenInDb,
    (req,res,next) => {
        res.render('newActivity',{title:'New activity'});
    });

    // post for creating new activity - endpoint
    router.post('/new',
    checkToken,
    (req,res,next) => {
        let decoded = jwtDecoder(req.token);
        let activityObj = {
            activityType: req.body.type,
            description: req.body.description,
            duration: req.body.duration,
            dateAndTime: req.body.dateTime,
            place: req.body.place
        };
        req.activityObj =  activityObj;
        req.email = decoded.email;
        req.sequelize = sequelize;
        next();
    },
    checkTokenInDb,
    getUser,
    createNewActivity,
    (req,res,next) => {
        res.redirect('/user');
    });

    // redirect from search button to get activity by type
    router.post('/search',
    (req,res,next)=>{
        res.redirect('/activity/search/'.concat(req.body.type).concat('/1'));
    });
    // get activity by type - endpoint
    router.get('/search/:type/:page',
    checkToken,
    (req,res,next) => {
        let decoded = jwtDecoder(req.token);
        req.email = decoded.email;
        req.sequelize = sequelize;
        req.page = req.params.page;
        req.activityType = req.params.type;
        next();
    },
    checkTokenInDb,
    getUser,
    getActivitiesByType,
    getPageActivities,
    (req,res,next)=> {
        res.render('activityList',
        {
            title: 'FitnessApp',
            activities: req.listOfActivities,
            page: req.page,
            numberOfPages: req.numberOfPages,
            pageIndex: req.page,
            urlForPaging:('/activity/search/'.concat(req.activityType).concat('/'))
        });
    });
    
    return router;
};