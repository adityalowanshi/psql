const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('demo', 'postgres', 'Aditya123', {
    host: 'localhost',
    dialect: 'postgres'
});

const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {

  },
);

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return sequelize;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
}

module.exports = { connection, sequelize };