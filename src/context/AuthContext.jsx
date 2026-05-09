import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  // =========================
  // USER STATE
  // =========================
  const [user, setUser] = useState(null);

  // =========================
  // LOGIN
  // =========================
  const login = (userData) => {
    setUser(userData);
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
