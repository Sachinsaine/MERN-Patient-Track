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

function App() {
  return (
    <>
      <BrowserRouter>
        <PatientContextProvider>
          <Navbar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patientInfo" element={<PatientInfo />} />
            <Route path="/patientDetails/:id" element={<PatientDetails />} />
            <Route path="/" element={<Overview />} />
            <Route path="/addPatient" element={<AddPatient />} />
          </Routes>
          <Footer />
        </PatientContextProvider>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
