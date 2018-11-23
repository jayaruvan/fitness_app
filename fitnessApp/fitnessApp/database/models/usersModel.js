module.exports = (sequelize, DataTypes) => {
    var Users = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            //unique: true
        },
        password: {
            type: DataTypes.STRING
        }
    });
   
    return Users;  
};