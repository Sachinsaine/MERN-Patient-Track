/* eslint-disable no-undef */

require("dotenv").config();

const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");

const app = express();

app.use(express.json());

const connectDB = require("./config/db");

const Patient = require("./models/PatientModel");

const patients = require("./data/patients");

console.log("Patient model:", Patient);
console.log("Patient type:", typeof Patient);

const PORT = 4000;

connectDB();
app.get("/api/patient", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to fetch patients", error: error.message });
  }
});

app.get("/api/patient/:id", (req, res) => {
  console.log(req.params.id);

  res.json({ message: "Single patient" });
});

app.post("/api/patient/seed", async (req, res) => {
  try {
    await Patient.deleteMany();

    const result = await Patient.insertMany(patients);

    res.status(201).json({
      message: "Patients inserted successfully",
      count: result.length,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to insert patients",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
