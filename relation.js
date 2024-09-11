const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// creating a sequalize instance 
const sequelize = new Sequelize('Car_rental', 'postgres', 'Aditya123', {
  host: 'localhost',
  dialect: 'postgres',
});
// checking connection with postgres server instance 
const connection = async() => {
  try {
    await sequelize.authenticate()
      .then((res) => console.log('Connection has been established successfully.')); // authenticating the connection with db
       return sequelize;
   } catch (error) {
     console.error('Unable to connect to the database:', error);
     throw error;
  }
};
 connection();
   // model defination 
   // user Model
const User = sequelize.define(
  'User',{
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
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    hasDrivinigLicence:{
     type : DataTypes.BOOLEAN,
     allowNull : false
    },
    pickupLocation : {
      type: DataTypes.STRING,
      allowNull:false
    }   
  }
);
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
        color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dailyRate: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        location : {
           type: DataTypes.STRING,
           allowNull : false
        }, 
        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },   
    })
const booking = sequelize.define('Rent', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'completed', 'cancelled'),
      defaultValue: 'active',
    },
  });


// Synchronize all models with the database
// sequelize.sync({ alter: true })
//   .then(() => console.log('tables created!'))
//   .catch(err => console.log('Error syncing database:', err));
User.hasMany(booking);
booking.belongsTo(User);

Car.hasMany(booking);
booking.belongsTo(Car);
module.exports = {
  User,
  Car,
  booking,
  connection
};