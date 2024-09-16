//const { booking,Car } = require('../relation');
const { booking } = require('../models/bookingModel')
const { Car } = require('../models/carModel')
const { User } = require('../models/userModel')
// get all user bookings
const getAllBooking = async (req, res) => {
  try {
    const { id } = req.body;
    const bookings = await booking.findAll({
      where: { id: id },
    });
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ message: "error in getting records" });
  }
};

// create a booking
const makeBooking = async (req, res) => {
  try {
    const { carId, userId, days, pickupLocation, dropLocation } = req.body;

    const car = await Car.findByPk(carId);
    const user = await User.findByPk(userId);
    if (!user || user === null) {
      return res.status(400).json({ message: "Only registered users can book, so please do registration first" });
    }
    if (!car || !car.isAvailable) {
      return res.status(400).json({ message: `Sorry, Car is not available` });
    }
    //  const check = ( pickupLocation)=> pickupLocation === car.location
    // if(!check){res.status(200).json({ message: "Please enter the Predecided locations" })};
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);
    const totalCost = calculateCost(car.dailyRate, startDate, endDate);

    const rental = await booking.create({
      carId,
      uId,
      startDate,
      endDate,
      totalCost,
      pickupLocation,
      dropLocation
    });
    await car.update({ isAvailable: false });
    res.status(201).json({
      message: "Booking created successfully", rentalId: rental.id, totalCost: rental.totalCost, pickupLocation: rental.pickupLocation,
      dropLocation: rental.dropLocation
    });
  } catch (error) {
    console.log("Booking error", error);
    res.status(500).json({ error: error.message });
  }
};

function calculateCost(dailyRate, startDate, endDate) {
  const dayDifference = (endDate - startDate) / (1000 * 60 * 60 * 4);
  const days = Math.max(dayDifference, 1);
  return dailyRate * days;
}

module.exports = { getAllBooking, makeBooking, calculateCost };