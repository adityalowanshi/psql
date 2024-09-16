//const { User } = require('../relation');
const { User } = require('../models/userModel');

// 1. Register user
const registerUser = async(req, res) => {
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
    });
    res.status(201).json({ message: "User created successfully", userId : user.id });
  } catch (error) {
    console.log("Something went wrong: ", error);
    res.status(500).json({ error: error.message });
  }
}; 

// 2. Get all users 
const getAllUsers = async (req, res) => {
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
};

module.exports = { getAllUsers, registerUser};