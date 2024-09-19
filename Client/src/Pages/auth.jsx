import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [services, setServices] = useState(""); // Add services state
  const authorizationToken = `Bearer ${token}`

  // Function to store the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // Determine if the user is logged in
  const isLoggedIn = !!token;
  console.log("token", token);
  console.log("isLoggedIn", isLoggedIn);

  // Function to log out the user
  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  // Function to fetch services
  const getservices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setServices(data.msg); // Set services state
        console.log(`Helloservices ${services}`)
      } else {
        console.error(`Failed to fetch services, status: ${response.status}`);
      }
    } catch (error) {
      console.log(`Error during fetch services: ${error}`);
    }
  };

  useEffect(() => {
    getservices();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, services, authorizationToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
