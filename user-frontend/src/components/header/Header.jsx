import "./Header.css";
import { useState, useEffect } from "react";
import { getUserInfo, postLogout } from "../../services/api";

const Header = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      try {
        const res = await getUserInfo();
        setName(res.user.name);
      } catch (err) {
        console.error(err);
      }
    };

    fetchName();
  }, []);

  const handleSubmit = async (e) => {
    try {
      console.log("here")
      const res = await postLogout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Header">
      <div className="container">
        <div className="name">Hi, {name}</div>
        <div
          className="logout"
          onClick={handleSubmit}
        >
          Logout
        </div>
      </div>

      <div className="gradient-box"></div>
      <div className="base-layer"></div>
    </div>
  );
};

export default Header;
