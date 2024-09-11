const express = require('express');
const app = express();
const { connection, sequelize, User, Car, booking } = require('./relation');
app.use(express.json());
const port = 3000;

app.get('/', (req, res) => res.send('Hello World! This is car rental platform'));

// POST:register endpoint
app.post('/register',async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber} = req.body;
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      hasDrivinigLicense,
    });
    res.status(201).json({ message: "User created successfully", userId: user.id });
  } catch (error) {
    console.log("Something went wrong: ", error);
    res.status(500).json({ error: error.message });
  }
});

// GET:all registered users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    if (users.length == 0) {
      return res.status(200).json("Please insert some users");
    }
    return res.json(users);
  } catch (error) {
    console.log("Error is ", error);
    return res.status(500).json("Internal server error");
  }
});

// GET: car details
app.get('/cars', async (req, res) => {
  try {
    const cars = await Car.findAll();
    if (cars.length === 0) {
      return res.status(200).json({ message: "No cars found" });
    }
    return res.status(200).json(cars);
  } catch (error) {
    console.log("Server error", error);
    res.status(500).json({ error: error.message });
  }
});

// POST: booking
app.post('/booking', async (req, res) => {
  try {
    const { carId, userId, startDate, endDate, pickupLocation, dropLocation} = req.body;
    const car = await Car.findByPk(carId);

    const check = () =>{ pickupLocation == car.location};

    if (!car || !car.isAvailable) {
      return res.status(400).json({ message: "Car not available" });
    }
    if(!check){res.status(200).json({ message: "Please enter the Predecided locations" })}
  
    const rental = await booking.create({
      UserId: userId,
      CarId: carId,
      startDate,
      endDate,
      totalCost:calculateCost(car.dailyRate, startDate, endDate),
      pickupLocation,
      dropLocation
    });
    await car.update({ isAvailable: false });
    res.status(201).json({ message: "Booking created successfully", rentalId: rental.id });
  } catch (error) {
    console.log("Booking error", error);
    res.status(500).json({ error: error.message });
  }
});

// New endpoint: List User Bookings
app.get('/users/:userId/bookings', async (req, res) => {
  try {
    const userId = req.userId;
    const bookings = await booking.findAll({
      where: { UserId: userId },
    });
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

function calculateCost(dailyRate, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = (end - start)/(1000*60*60*24);
  if(days<1) {days = 1 };
  return dailyRate * days;
}

const startServer = async () => {
  try {
    await connection();
    app.listen(port, () => console.log(`App listening on port http://localhost:${port}`));
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};
startServer();