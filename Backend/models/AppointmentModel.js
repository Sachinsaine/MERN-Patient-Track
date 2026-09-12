/* eslint-disable no-undef */
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  patient: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  doctor: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
