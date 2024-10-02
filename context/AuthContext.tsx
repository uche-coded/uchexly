import { createContext, useContext, useState } from "react";

interface AuthProps {
  authState: { authenticated: Boolean | null, username: string | null };
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
}

const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    authenticated: Boolean | null;
    username: string | null;

  }>({
    authenticated: null,
    username: null,
  })

  const login = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin') {
      setAuthState({
        authenticated: true,
        username: username
      })
    } else {
      alert("invalid username or password")
    }
  }

  const logout = () => {
    console.log("inside log out ***************")
    setAuthState({
      authenticated: false,
      username: null
    })
  }

  const value = {
    onLogin: login,
    onLogout: logout,
    authState
  }

  console.log("value------------", value)
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

