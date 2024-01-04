import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [login, setlogin] = useState("ahmed");
  return <AuthContext.Provider value={{login,setlogin}}>{children}</AuthContext.Provider>;
};
