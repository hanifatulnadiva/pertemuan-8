module.exports=(sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id_user: {
            type: DataTypes.INTEGER,    
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false    
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    User.associate = function(models) {
        User.hasMany(models.ApiKey, { 
            foreignKey: 'id_user', 
        as:'apiKeys'});
    }
    return User;
}