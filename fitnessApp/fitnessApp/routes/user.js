var express = require('express');
var router = express.Router();
const checkToken = require('../middleware/checkToken');
const checkTokenInDb = require('../database/controllers/user/checkTokenInDb');
const getUser = require('../database/controllers/user/getUser');
const getActivities = require('../database/controllers/activity/getActivities');
const getPageActivities = require('../middleware/getPageActivities');
const deleteActivity = require('../database/controllers/activity/deleteActivity');
const updateActivity = require('../database/controllers/activity/updateActivity');
const getSpecificActivity = require('../database/controllers/activity/getSpecificActivity');
const jwtDecoder = require('jwt-decode');

module.exports = sequelize => {

    // get user - endpoint  
    router.get('/',
    checkToken,
    (req, res, next) => {       
        req.sequelize = sequelize;
        next();
     },
    checkTokenInDb,
    (req, res, next) => {
        res.redirect('/user/1')
    });


    // get specific page - endpoint
    router.get('/:page', 
    checkToken,
    (req, res, next) => {
        let decoded = jwtDecoder(req.token);
        req.page = req.params.page;
        req.email = decoded.email;
        req.sequelize = sequelize;
        next();
    },
    checkTokenInDb,
    getUser,
    getActivities,
    getPageActivities,
    (req, res, next) => {
        res.render('activityList',
        {
            title: 'FitnessApp',
            activities: req.listOfActivities,
            page: req.page,
            numberOfPages: req.numberOfPages,
            pageIndex: req.page,
            urlForPaging:('/user/')
        });

    }
    );

    //  get delete for activity - endpoint 
    router.get('/delete/:idToDelete',
    checkToken,
    (req, res, next) => {
        let decoded = jwtDecoder(req.token);
        req.email = decoded.email;
        req.idToDelete = req.params.idToDelete;
        req.sequelize = sequelize;
        next();
    },
    checkTokenInDb,
    getUser,
    deleteActivity,
    (req, res, next) => {
        res.redirect('/user');
    });

    // get form for updating activity - endpoint
    router.get('/getform/:idToUpdate',
        checkToken,
        (req, res, next) => {
            let decoded = jwtDecoder(req.token);
            req.email = decoded.email;
            req.idToUpdate = req.params.idToUpdate;
            req.sequelize = sequelize;
            next();
        },
        checkTokenInDb,
        getUser,
        getSpecificActivity,
        (req,res,next) => {
            res.render('formSpecific',{
                title: 'Form for changing activity',
                activity: req.activity
            });
        }
        
    );

    // update specific activity - endpoint
    router.post('/update/:idToUpdate',
    checkToken,
    (req,res,next) => {
        let decoded = jwtDecoder(req.token);
        let updateObj = {
            activityType:req.body.type,
            description:req.body.description,
            duration: req.body.duration,
            dateAndTime: req.body.dateTime,
            place: req.body.place
        };
        req.updateObj = updateObj;
        req.email = decoded.email;
        req.idToUpdate = req.params.idToUpdate;
        req.sequelize = sequelize;
        next();
    },
    checkTokenInDb,
    getUser,
    getSpecificActivity,
    updateActivity,
    (req,res,next)=>{
        res.redirect('/user');
    });

   
    return router;
};



