import { useEffect, useState } from "react";

export const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/patient`,

          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }

        const data = await response.json();

        setPatients(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return {
    patients,
    loading,
    error,
    setPatients,
  };
};
