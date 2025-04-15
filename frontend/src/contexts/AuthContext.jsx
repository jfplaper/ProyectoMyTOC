import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Create the context
const AuthContext = createContext(null);

// Create the provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = localStorage.getItem("user");
    // Returns true if user exists in localStorage
    return !!user;
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const register = async (username, password, email) => {
    try {
      const response = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"username": username, "password": password, "email": email})
      });

      if (!response.ok) {
        console.error("Error to register - Response status: ", response.status);
        toast.error("Error al registrarse. Rellena correctamente todos los campos");
      }
      toast.success("¡Bienvenido! ¡Ya estás registrado!");
    } catch (error) {
      throw new Error("Error to register: ", error);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"username": username, "password": password})
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(data));
      } else if (!response.ok) {
        console.error("Error to login - Response status: ", response.status);
        toast.error("Error al iniciar sesión. Rellena correctamente todos los campos");
      }
      return data;
    } catch (error) {
      throw new Error("Error to login: ", error);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a customed hook to export the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
