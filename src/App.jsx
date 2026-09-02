import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Navbar } from "./components/Navbar/Navbar";
import { PatientContextProvider } from "./context/PatientContextProvider";
import { PatientInfo } from "./components/PatientInfo/PatientInfo";
import { PatientDetails } from "./components/PatientDetails/PatientDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <PatientContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patientInfo" element={<PatientInfo />} />
            <Route path="/patientDetails/:id" element={<PatientDetails />} />
          </Routes>
        </PatientContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
