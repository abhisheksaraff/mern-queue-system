import "./Login.css";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
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
