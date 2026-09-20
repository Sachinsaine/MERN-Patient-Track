import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Navbar } from "./components/Navbar/Navbar";
import { PatientContextProvider } from "./context/PatientContextProvider";
import { PatientInfo } from "./components/PatientInfo/PatientInfo";
import { PatientDetails } from "./components/PatientDetails/PatientDetails";
import { Overview } from "./components/Overview/Overview";
import { AddPatient } from "./components/Forms/AddPatient";
import { Footer } from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import { Schedule } from "./components/Schedule/Schedule";
import { AppointmentForm } from "./components/Forms/AppointmentForm";
import { Login } from "./components/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");
  return (
    <>
      <BrowserRouter>
        <PatientContextProvider>
          {token && <Navbar />}
          <Routes>
            <Route path="/" element={<Login />} />

            <Route
              path="/overview"
              element={
                <ProtectedRoute>
                  <Overview />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/patientInfo"
              element={
                <ProtectedRoute>
                  <PatientInfo />
                </ProtectedRoute>
              }
            />

            <Route
              path="/patientDetails/:id"
              element={
                <ProtectedRoute>
                  <PatientDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/addPatient"
              element={
                <ProtectedRoute>
                  <AddPatient />
                </ProtectedRoute>
              }
            />

            <Route
              path="/schedule"
              element={
                <ProtectedRoute>
                  <Schedule />
                </ProtectedRoute>
              }
            />

            <Route
              path="/appointment"
              element={
                <ProtectedRoute>
                  <AppointmentForm />
                </ProtectedRoute>
              }
            />
          </Routes>
          {token && <Footer />}
        </PatientContextProvider>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
