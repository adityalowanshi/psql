const { booking,Car } = require('../relation');
// get all user bookings
const getAllBooking = async (req, res) => {
  try {
    const {id} = req.body;
    const bookings = await booking.findAll({
      where: { id: uid },
    });
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// create a booking
const makeBooking = async (req, res) => {
  try {
    const { carId,days,pickupLocation, dropLocation} = req.body;
    const car = await Car.findByPk(carId);

    if (!car || !car.isAvailable) {
      return res.status(400).json({ message: "Car not available" });
    }
    if(!check){res.status(200).json({ message: "Please enter the Predecided locations" })}
  
    const rental = await booking.create({
      CarId: carId,
      startDate,
      endDate,
      totalCost:calculateCost(car.dailyRate,days),
      pickupLocation,
      dropLocation
    });
    await car.update({ isAvailable: false });
    res.status(201).json({ message: "Booking created successfully", rentalId: rental.id , totalCost :rental.totalCost });
  } catch (error) {
    console.log("Booking error", error);
    res.status(500).json({ error: error.message });
  }
};

function calculateCost(dailyRate, days) {

  const day = (end - start)/(1000*60*60*24);
  if(days<1) {days = 1 };
  return dailyRate * day;
}


module.exports = {getAllBooking, makeBooking, calculateCost};