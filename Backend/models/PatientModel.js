/* eslint-disable no-undef */
const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  profile_picture: String,
  date_of_birth: String,
  phone_number: String,
  emergency_contact: String,
  insurance_type: String,
  diagnosis_history: [
    {
      month: String,
      year: Number,
      blood_pressure: {
        systolic: {
          value: Number,
          levels: String,
        },
        diastolic: {
          value: Number,
          levels: String,
        },
      },
      heart_rate: {
        value: Number,
        levels: String,
      },
      respiratory_rate: {
        value: Number,
        levels: String,
      },
      temperature: {
        value: Number,
        levels: String,
      },
    },
  ],
  diagnostic_list: [
    {
      name: String,
      description: String,
      status: String,
    },
  ],
  lab_results: [String],
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
