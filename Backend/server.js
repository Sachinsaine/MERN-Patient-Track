/* eslint-disable no-undef */

require("dotenv").config();

// const dns = require("dns");

// dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// For Deployment

const FRONTEND_URL = "https://mern-patient-track-axkc.vercel.app";

app.use(
  cors({
    origin: ["http://localhost:5173", FRONTEND_URL],
    credentials: true,
  }),
);


// For Local Development
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   }),
// );

app.use(express.json());
app.use(cookieParser());

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

//image uploading
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
});

const connectDB = require("./config/db");

const Patient = require("./models/PatientModel");
const Appointment = require("./models/AppointmentModel");

const patients = require("./data/patients");
const verifyToken = require("./middleware/authMiddleware");

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Patient Track API is running",
  });
});

app.get("/api/patient", verifyToken, async (req, res) => {
  try {
    // const patients = await Patient.find();
    const patients = await Patient.find().sort({ createdAt: -1 });

    res.status(200).json(patients);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch patients",
      error: error.message,
    });
  }
});

app.get("/api/patient/:id", async (req, res) => {
  try {
    const { id } = req.params;

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

app.post("/api/patient", upload.single("profile_picture"), async (req, res) => {
  try {
    console.log("========== ADD PATIENT ==========");
    console.log("Received body:", req.body);
    console.log("Received file:", req.file);

    const parseJSON = (value, fallback) => {
      if (!value) return fallback;

      try {
        return JSON.parse(value);
      } catch {
        return fallback;
      }
    };

    const patient = new Patient({
      ...req.body,

      diagnosis_history: parseJSON(req.body.diagnosis_history, []),

      diagnostic_list: parseJSON(req.body.diagnostic_list, []),

      lab_results: parseJSON(req.body.lab_results, []),

      profile_picture: req.file ? req.file.filename : "",
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

app.put(
  "/api/patient/:id",
  upload.single("profile_picture"),
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid patient ID",
        });
      }

      const updateData = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        date_of_birth: req.body.date_of_birth,
        phone_number: req.body.phone_number,
        emergency_contact: req.body.emergency_contact,
        insurance_type: req.body.insurance_type,
      };

      if (req.file) {
        updateData.profile_picture = req.file.filename;
      }

      const updatedPatient = await Patient.findByIdAndUpdate(id, updateData, {
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
      console.error("UPDATE PATIENT ERROR:", error);

      res.status(500).json({
        message: "Failed to update patient",
        error: error.message,
      });
    }
  },
);

app.delete("/api/patient/:id", async (req, res) => {
  try {
    const { id } = req.params;

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

app.get("/api/appointments", async (req, res) => {
  try {
    const response = await Appointment.find();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed find appointments",
      error: error.message,
    });
  }
});

app.post("/api/appointments", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);

    const savedAppointment = await appointment.save();

    res.status(200).json(savedAppointment);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to create an appointment",
      error: error.message,
    });
  }
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);

    process.exit(1);
  }
};

startServer();
