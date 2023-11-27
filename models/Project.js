const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('projects',{
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
    name :{
        type : DataTypes.STRING,
        allowNull: false
    }
});
module.exports = Project;