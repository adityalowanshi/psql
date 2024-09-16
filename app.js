const express = require('express');
const app = express();
const connection = require('./connection.js');
const {getAllUsers,registerUser} = require('./controllers/userController')
const {getAllBooking, makeBooking} = require('./controllers/bookingController')
const { getAllCars ,postCar} = require('./controllers/carController.js')
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello ,This is car rental platform'));

// syncDb();
//start server and connect with postgres
const startServer = async () => {
  try {
    await connection()
    app.listen(port, () => console.log(`App listening on port ${port}`));
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};
startServer();

// ----User endpoints----
//1.POST:register endpoint
app.post('/register',registerUser);

//2.GET:all registered users
app.get('/users',getAllUsers);

//----Booking endpoints----

//1. POST: booking 
app.post('/booking',makeBooking);
// 2. GET bookings of a user
app.get('/users/bookings',getAllBooking);

// Car endpoints
// 1. GET: car details
app.get('/cars',getAllCars);
app.post('/user/postcar',postCar);
 