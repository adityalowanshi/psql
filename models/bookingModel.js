const {sequelize,DataTypes} = require('../database/db');

const booking = sequelize.define('Rent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  uid:{
    type:DataTypes.INTEGER}
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalCost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  pickupLocation:{
    type:DataTypes.STRING,
    allowNull : false
  },
  dropLocation:{
    type: DataTypes.STRING,
    allowNull: false
  }
});
module.exports = {booking};