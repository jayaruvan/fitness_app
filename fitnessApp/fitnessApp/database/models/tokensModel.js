module.exports = (sequelize, DataTypes) => {

    var Tokens = sequelize.define('Tokens', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: DataTypes.STRING,
           // unique: true
        },
        fk_id: {
            type: DataTypes.INTEGER
        }
    });
    
    return Tokens;
};