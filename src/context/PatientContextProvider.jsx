/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
import { PatientContext } from "./PatientContext";
import { usePatients } from "../hooks/usePatients";
import { useEffect, useState } from "react";

export const PatientContextProvider = ({ children }) => {
  const { patients, loading, error } = usePatients();
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patient = patients.find((patient) => patient._id === selectedPatient);

  useEffect(() => {
    if (!selectedPatient && patients?.length > 0) {
      setSelectedPatient(patients[0]._id);
    }
  }, [patients, selectedPatient]);

  const value = {
    patients,
    loading,
    error,
    patient,
    selectedPatient,
    setSelectedPatient,
  };
  return (
    <PatientContext.Provider value={value}>{children}</PatientContext.Provider>
  );
};
