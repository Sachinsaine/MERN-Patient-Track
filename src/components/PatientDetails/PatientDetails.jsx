import { useParams } from "react-router-dom";
import { DiagnosisHistory } from "../DiagnosisHistory/DiagnosisHistory";
import { PatientProfile } from "../PatientProfile/PatientProfile";
import { useContext, useEffect } from "react";
import { PatientContext } from "../../context/PatientContext";
import { LabResults } from "../LabResults/LabResults";

export const PatientDetails = () => {
  const { id } = useParams();
  const { setSelectedPatient } = useContext(PatientContext);

  useEffect(() => {
    setSelectedPatient(id);
  }, [id, setSelectedPatient]);

  return (
    <div>
      <PatientProfile />
      <DiagnosisHistory />
      <LabResults />
    </div>
  );
};
