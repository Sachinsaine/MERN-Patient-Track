import "./App.css";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Navbar } from "./components/Navbar/Navbar";
import { PatientContextProvider } from "./context/PatientContextProvider";

function App() {
  return (
    <>
      <PatientContextProvider>
        <Navbar />
        <Dashboard />
      </PatientContextProvider>
    </>
  );
}

export default App;
