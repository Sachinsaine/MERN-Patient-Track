/* eslint-disable no-undef */

require("dotenv").config();

const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

const connectDB = require("./config/db");

const Patient = require("./models/PatientModel");

const Appointment = require("./models/AppointmentModel");

const patients = require("./data/patients");

const PORT = process.env.PORT || 4000;

connectDB();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Patient Track API is running",
  });
});

app.get("/api/patient", async (req, res) => {
  try {
    const patients = await Patient.find();

    res.status(200).json(patients);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch patients",
      error: error.message,
    });
  }
});

// PATIENTS
app.get("/api/patient/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check whether ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid patient ID",
      });
    }

    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch patient",
      error: error.message,
    });
  }
});

// app.post("/api/patient", async (req, res) => {
//   try {
//     console.log("Received patient:", req.body);

//     const patient = new Patient(req.body);

//     const savedPatient = await patient.save();

//     res.status(201).json(savedPatient);
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Failed to create patient",
//       error: error.message,
//     });
//   }
// });

app.post("/api/patient", upload.single("profile_picture"), async (req, res) => {
  try {
    console.log("========== ADD PATIENT ==========");
    console.log("Received body:", req.body);
    console.log("Received file:", req.file);

    const patient = new Patient({
      ...req.body,
      profile_picture: req.file ? req.file.originalname : "",
    });

    const savedPatient = await patient.save();

    res.status(201).json(savedPatient);
  } catch (error) {
    console.error("CREATE PATIENT ERROR:", error);

    res.status(500).json({
      message: "Failed to create patient",
      error: error.message,
    });
  }
});

app.put("/api/patient/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check whether ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid patient ID",
      });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPatient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update patient",
      error: error.message,
    });
  }
});

app.delete("/api/patient/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check whether ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid patient ID",
      });
    }

    const deletedPatient = await Patient.findByIdAndDelete(id);

    if (!deletedPatient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.status(200).json({
      message: "Patient deleted successfully",
      patient: deletedPatient,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete patient",
      error: error.message,
    });
  }
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

// APPOINTMENTS
app.get("/api/appointments", async (req, res) => {
  try {
    let response = await Appointment.find();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed find appointments", error: error.message });
  }
});

app.post("/api/appointments", async (req, res) => {
  try {
    let appointment = new Appointment(req.body);

    const saveAppointment = await appointment.save();
    res.status(200).json(saveAppointment);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create an appointment",
      error: error.message,
    });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
