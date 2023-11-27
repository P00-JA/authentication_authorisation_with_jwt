const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserData = sequelize.define('usersData',{
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
    firstName :{
        type : DataTypes.STRING,
        allowNull: false
    },
    lastName :{
        type : DataTypes.STRING,
        allowNull: false
    },
    email:{
        type : DataTypes.STRING,
        allowNull : false
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    }

});

module.exports = UserData;