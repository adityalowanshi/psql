// const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { connection, sequelize, User, Car } = require('./relation'); // 
const cors = require('cors')
app.use(express.json());

// app.use(bodyParser.urlencoded({extended : true}));

const port = process.env.PORT_NO || 3000;


app.get('/',(req, res) => res.send('Hello World! this is car rental platform'));

// POST : register endpoint (running with a bug)

app.post('/register', async (req, res) => {
  try {

    const { firstName, lastName, email, password, phoneNumber, driverLicenseNumber, dateOfBirth } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    if (existingUser == null) {
      const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        driverLicenseNumber: driverLicenseNumber,
        dateOfBirth: dateOfBirth
      }).then((res) => res.status(201).json({ message: " user created succefully" })).then(console.log('User registered successfully', user.id));
      return user;
    }
  }
  catch (error) {
    console.log("something went wrong  ", error);
  }
}
);

// GET : all users registerd (running perfectly)
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    if (users.length == 0) {
      return res.status(200).json("please insert some users");
    }
    return res.send(users);
  }
  catch (error) {
    console.log("errror is ", error);
    return res.status(200).json("internal server error")
  }
})

//for car details
app.get('/cars', async (req, res) => {
  try {
    const cars = Car.findAll();
    if (cars == null) {
      res.status(200).json({ message: "Cars not found" })
    }
    return res.status(201).json({ message: "Car fetched successfully" })
  }
  catch (error) {
    console.log("server error", error);
  }
})

app.post('/booking', async (req, res) => {
  try {
    const { id } = req.body;
    // check if car is available 
    const car = await Car.find({where :{ id:id}});
    res.send(car);
    res.status(200).json({message : ""})
  } catch (error) {

  }

})
//starting the applications if called 
const startServer = async () => {
  try {
    await connection();
    app.listen(port, () => console.log(`App listening on port http//:localhost:${port}`));
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1); // failure 
  }
};
startServer();



