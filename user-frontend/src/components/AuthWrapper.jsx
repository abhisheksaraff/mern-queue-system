import { Navigate } from "react-router-dom";
import { useUserLoginStatus } from "../hooks/UseUserLoginStatuss";

const AuthWrapper = ({ children }) => {
  const { isLoggedIn, loading } = useUserLoginStatus();

  if (loading) return <p>Loading...</p>;
  if (!isLoggedIn) return <Navigate to="/login" />;

  return children;
};

export default AuthWrapper;