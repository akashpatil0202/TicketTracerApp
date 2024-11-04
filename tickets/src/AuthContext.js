import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      // const response = await axios.get("http://localhost:3001/admins");
      const response = await axios.get(
        "https://67288abe270bd0b975561009.mockapi.io/api/admins"
      );
      const admins = response.data;

      const admin = admins.find(
        (admin) =>
          admin.username === credentials.username &&
          admin.password === credentials.password
      );

      if (admin) {
        setIsAuthenticated(true);
        setError(null);
        return admin;
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
      setError("Login failed. Please try again.");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
