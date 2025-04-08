// src/components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  if (!user) {
    localStorage.setItem("redirectAfterLogin", location.pathname); // Save path to go back
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
