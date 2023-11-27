const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Team = sequelize.define('teams',{
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
    name :{
        type : DataTypes.STRING,
        allowNull: false
    },
    department :{
        type : DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Team;