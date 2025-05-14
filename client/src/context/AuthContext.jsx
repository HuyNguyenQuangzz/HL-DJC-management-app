import React, { createContext, useState, useEffect } from "react";
import { login } from "../api/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userLevel, setUserLevel] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Check for token in localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserLevel(parsedUser.level);
      setIsAuthenticated(true);
    }
  }, []);

  const loginUser = async (username, password) => {
    try {
      const response = await login(username, password);
      const { token, user } = response;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setToken(token);
      setUser(user);
      setUserLevel(user.level);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setUserLevel(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userLevel, user, token, loginUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
