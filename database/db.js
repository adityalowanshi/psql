const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

//creating a sequalize db instance

const sequelize = new Sequelize('car_rent','postgres','Aditya123', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = {sequelize,DataTypes};