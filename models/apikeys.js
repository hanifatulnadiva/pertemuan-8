module.exports=(sequelize, DataTypes) => 
{
    const ApiKey = sequelize.define('ApiKey', {
        id_apiKey: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        out_of_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });
    ApiKey.associate = function(models) {
        ApiKey.belongsTo(models.User, { 
            foreignKey: 'id_user',
        as:'user' });
    };
    return ApiKey;
};