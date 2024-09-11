import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserInterface } from '../pages/Admin/users/utils';



interface AuthContextType {
  user: UserInterface | null;
  login: (userData: UserInterface) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInterface | null>(null);

  const login = (userData: UserInterface) => {
    // Implement login logic here (e.g., API call)
    setUser(userData);
  };

  const logout = () => {
    // Implement logout logic here
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
