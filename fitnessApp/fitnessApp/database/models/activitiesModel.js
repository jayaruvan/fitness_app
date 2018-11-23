module.exports = (sequelize, DataTypes) => {
    var Activities = sequelize.define('Activities', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        activityType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateAndTime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        place: {
            type: DataTypes.STRING
        }
    });

    return Activities;  
};