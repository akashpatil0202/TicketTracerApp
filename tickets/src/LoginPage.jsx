import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import "./mystyle.css";
import logo from "../src/alogo.png";

const LoginPage = () => {
  const { login, error } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    // Validation for empty fields
    if (!credentials.username && !credentials.password) {
      setLoginError("Please enter your username and password.");
      return;
    }

    if (!credentials.username) {
      setLoginError("Please enter your username.");
      return;
    }

    if (!credentials.password) {
      setLoginError("Please enter your password.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3001/admins");
      const admins = response.data;

      const admin = admins.find(
        (admin) =>
          admin.username === credentials.username &&
          admin.password === credentials.password
      );

      if (admin) {
        await login(admin);
        navigate("/home");
      } else {
        setLoginError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
      setLoginError("Login failed. Please try again.");
    }
  };

  return (
    <>
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          {loginError && <div className="error">{loginError}</div>}
          {error && <div className="error">{error}</div>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
    </>
  );
};

export default LoginPage;
