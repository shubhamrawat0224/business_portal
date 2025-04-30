import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      return token && token.split(".").length === 3 ? jwtDecode(token) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (token && token.split(".").length === 3) {
      try {
        setUser(jwtDecode(token));
        localStorage.setItem("token", token);
      } catch {
        setUser(null);
        localStorage.removeItem("token");
      }
    } else {
      setUser(null);
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (token) => setToken(token);
  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
