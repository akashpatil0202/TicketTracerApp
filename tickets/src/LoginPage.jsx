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

    if (!credentials.username || !credentials.password) {
      setLoginError("Please enter your username and password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/admins/login",
        credentials
      );
      if (response.status === 200) {
        await login(response.data);
        navigate("/home");
      } else {
        setLoginError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("Login failed. Please try again.");
    }
  };

  return (
    <>
      <div className="login-page-container">
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
      </div>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
    </>
  );
};

export default LoginPage;
