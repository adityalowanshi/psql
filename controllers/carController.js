//const { Car } = require('../relation');
const { Car } = require('../models/carModel');

const postCar = async (req, res)=>{
    try {
        const {make, model, dailyRate, location, isAvailable, numberPlate } = req.body;
        const existingCar = await Car.findOne({ where: { numberPlate : numberPlate}});
        if (existingCar) {
            return res.status(400).json({ message: 'Car already exists' });
        }
        const user = await Car.create({
           make,
           model,
           dailyRate,
           location,
           isAvailable,
           numberPlate,
        });
        res.status(201).json({ message: "car registered successfully", userId: user.id });
    } catch (error) {
        console.log("Something went wrong: ",error);
        res.status(500).json({ error: error.message });
    }
};

  
const getAllCars = async (req, res) => {
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
}

module.exports = { getAllCars, postCar };