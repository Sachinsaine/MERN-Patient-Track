import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login or register first");
    return <Navigate to="/" replace />;
  }
  return children;
};
