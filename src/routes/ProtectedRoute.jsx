import { useContext } from "react";

import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  // =========================
  // CONTEXT
  // =========================
  const { user } = useContext(AuthContext);

  // =========================
  // NOT LOGIN
  // =========================
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
