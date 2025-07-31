import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserLoginStatus } from "../services/api";

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await getUserLoginStatus();
        setIsLoggedIn(res.loggedIn);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
