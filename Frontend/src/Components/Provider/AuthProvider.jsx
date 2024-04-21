/* eslint-disable react/prop-types */
import { createContext } from "react";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  let user = "admin";
  let authInfo = {
    user: user,
    user_id: 11,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
