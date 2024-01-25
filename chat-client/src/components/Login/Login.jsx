import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleCred = (value) => {
    return setCredentials((cred) => {
      return { ...cred, ...value };
    });
  };
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `http://localhost:5000/api/signin`,
        {
          ...credentials,
        },
        { withCredentials: true }
      );
      if (response) {
        navigate("/chat");
        setUserLoggedIn(true);
        window.location.reload(false);
      } else {
        navigate("/login");
        alert("User credentials are invalid ")
        setUserLoggedIn(false);
        window.location.reload(false);
      }
    } catch (error) {
      setUserLoggedIn(false);
      window.location.reload(false);
      console.log("Error while logging in..");
    }
  };
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="form-group">
        <div className="segment">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={credentials.email}
            placeholder="Enter your email"
            onChange={(e) => handleCred({ email: e.target.value })}
          />
        </div>
        <div className="segment">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            id="password"
            placeholder="Enter your password"
            onChange={(e) => handleCred({ password: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {" "}
          Login
        </button>
      </form>
      <div>
        <a href="/forgot-password">Forgot password?</a>
      </div>
    </div>
  );
};

export default Login;
