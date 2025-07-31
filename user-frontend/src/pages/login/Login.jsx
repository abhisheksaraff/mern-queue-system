import "./Login.css";
import { useState } from "react";
import { postLogin } from "../../services/api";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const handleSubmit =  async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const password = e.target.password.value;

    try {
      const res = await postLogin({ id, password });
      if (res.loggedIn) {
        setIsLoggedIn(true);
        navigate("/home");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed");
      console.error(err);
    }
  };

  return (
    <div className="Login">
      <div className="box">
        <div className="mdl">
          <div className="circles">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
          </div>

          <h1 className="title">
            <br />
          </h1>

          <div className="card">
            <form id="login-form" onSubmit={handleSubmit}>
              <div className="logo">UNIVERSITY LOGIN</div>

              <div className="username">
                <label>Username</label>
                <input
                  id="username"
                  name="id"
                  placeholder="username"
                  type="text"
                  required
                  maxLength={10}
                />
                <span className="underline"></span>
              </div>

              <br />

              <div className="password">
                <label>Password</label>
                <input
                  id="password"
                  name="password"
                  placeholder="password"
                  type="password"
                  required
                />
                <span className="underline"></span>
              </div>

              <div className="expiration-date"></div>

              <div className="ccv"></div>

              <div
                className="submit"
                onClick={() => {
                  document.getElementById("login-form").requestSubmit();
                }}
              >
                Login
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
