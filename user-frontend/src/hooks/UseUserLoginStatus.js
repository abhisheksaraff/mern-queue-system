import { useEffect, useState } from "react";
import { getUserLoginStatus } from "../services/api";

export const useUserLoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await getUserLoginStatus();
        setIsLoggedIn(res.loggedIn);
      } catch (err) {
        setIsLoggedIn(false);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  return { isLoggedIn, loading };
};
