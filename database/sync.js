const { sequelize } = require('./db');
const { User } = require('../models/userModel')
const { booking } = require('../models/bookingModel');
const { Car } = require('../models/carModel')

const syncDb = async (sequalize) => {
    User.hasMany(booking);
    booking.belongsTo(User);

    Car.hasMany(booking);
    booking.belongsTo(Car);
    sequelize.sync({ alter: false }).then(() => console.log("model synchronisation is done"));
}

module.exports = {syncDb};

