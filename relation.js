const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('car_rent','postgres', 'Aditya123', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,         // {firstname, lastname, email, password, phoneNumber }
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
});

const Car = sequelize.define('Car', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  make: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dailyRate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  numberPlate:{
    type: DataTypes.STRING
  }
});

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

// sequelize.sync({alter :true}).then(()=> console.log("model synchronisation is done"))

User.hasMany(booking);
booking.belongsTo(User);

Car.hasMany(booking);
booking.belongsTo(Car);

module.exports = {
  User,
  Car,
  booking,
  sequelize,
};