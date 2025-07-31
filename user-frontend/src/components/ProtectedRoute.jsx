import { Navigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => useContext(AuthContext);

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
