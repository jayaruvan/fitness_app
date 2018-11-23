const Sequelize = require('sequelize');
const databaseInfo = require('../auth');
const usersModel = require('../models/usersModel');
const tokensModel = require('../models/tokensModel');
const activitiesModel = require('../models/activitiesModel');
const bcrypt = require('bcryptjs');
module.exports = (() => {
    
    const sequelize = new Sequelize(
        databaseInfo.databaseName, 
        databaseInfo.databaseUser,
        databaseInfo.databasePassword, 
        {
            host: databaseInfo.databaseHost,
            dialect: 'postgres',
            operatorsAliases: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    );
    let tokens = tokensModel(sequelize,Sequelize);
    let users = usersModel(sequelize,Sequelize);
    let activities = activitiesModel(sequelize,Sequelize);

    // associations
    users.hasMany(tokens,{foreignKey: 'fk_id'});
    users.hasMany(activities,{foreignKey: 'userId'})

    sequelize
      .sync({force:false})
      .then(()=>{
        console.log('Tables were created succesfully.');
        /*
        // testing data  starting block------
        
        let password = '123456';
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, function(err, hash) {
            password = hash;
            sequelize.models.Users.create({
              email: 'admin@lennieuniza.sk',
              password: password
            }).then(user => { 
              console.log('user admin@lennieuniza.sk was created');
              sequelize.models.Activities.bulkCreate([
                // random activities
                {
                  userId:user.id,
                  activityType: 'Beh',
                  duration: '1h',
                  description: 'ranny beh na autobus',
                  dateAndTime: '2011-08-19T13:44:00',
                  place: 'Poprad'
                },
                
                {
                  userId:user.id,
                  activityType: 'Beh',
                  duration: '12h',
                  description: 'maraton do SNV',
                  dateAndTime: '2011-08-19T13:43:00',
                  place: 'Spisska Nova Ves'
                },

                {
                  userId:user.id,
                  activityType: 'Beh',
                  duration: '10h',
                  description: 'maraton z Budapesti',
                  dateAndTime: '2011-08-19T11:42:00',
                  place: 'Spisska Sobota'
                },

                {
                  userId:user.id,
                  activityType: 'Chodza',
                  duration: '15h',
                  description: 'dal som si len tak 15 hodinovu chodzu, sak co',
                  dateAndTime: '2018-08-19T16:41:00',
                  place: 'Poprad'
                },

                {
                  userId:user.id,
                  activityType: 'Chodza',
                  duration: '11h',
                  description: 'trochu dlhsia prechadzka v parku v Trencine',
                  dateAndTime: '2016-03-19T13:45:00',
                  place: 'Trencin'
                },
                {
                  userId:user.id,
                  activityType: 'Joga',
                  duration: '2h',
                  description: 'v Bratislave maju kvalitnu jogu',
                  dateAndTime: '2018-07-23T10:45:00',
                  place: 'Bratislava'
                },
                {
                  userId:user.id,
                  activityType: 'CrossFit',
                  duration: '5.5h',
                  description: 'crossfit jak za mlada',
                  dateAndTime: '2018-06-25T13:45:00',
                  place: 'Zilina'
                },
                {
                  userId:user.id,
                  activityType: 'Workout',
                  duration: '4h',
                  description: 'dal som si do tela',
                  dateAndTime: '2012-04-16T18:25:00',
                  place: 'Trnava'
                },
                {
                  userId:user.id,
                  activityType: 'Workout',
                  duration: '11h',
                  description: 'take dlhe cvicenie ma raz zabije',
                  dateAndTime: '2016-07-12T19:45:00',
                  place: 'Kosice'
                },
                {
                  userId:user.id,
                  activityType: 'CrossFit',
                  duration: '1.5h',
                  description: 'crossfit v BB s kamosom',
                  dateAndTime: '2017-06-11T13:45:00',
                  place: 'Banska Bystrica'
                },
                

              ]).then(() =>{
                console.log('creating activities: done!');
              });
              
            });
          }
          );
        });*/
        //testing data end block -----  
      })
      .catch(err => {
          console.error('Tables were not created');
          process.exit(1);
      });
    
    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
    
    
    
    
    return sequelize;
});
