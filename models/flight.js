const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const destinationSchema = new mongoose.Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'] // Add more airports if needed
  },
  arrival: {
    type: Date,
    required: true
  }
});

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: ["American", "Southwest", "United"], // Add more airlines if needed
    required: true,
  },
  airport: {
    type: String,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"], // Add more airports if needed
    default: "DEN",
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      return date;
    },
  },
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
