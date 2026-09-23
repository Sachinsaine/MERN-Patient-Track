/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const usePatients = () => {
  const { user, loading: authLoading } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setPatients([]);
      setLoading(false);
      return;
    }

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
  }, [user, authLoading]);

  return {
    patients,
    loading,
    error,
    setPatients,
  };
};
