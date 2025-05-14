import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../api/authApi';

interface User {
  _id: string;
  username: string;
  level: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userLevel: string | null;
  user: User | null;
  token: string | null;
  loginUser: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userLevel, setUserLevel] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');
        if (storedToken && storedUser) {
          setToken(storedToken);
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);
          setUserLevel(parsedUser.level);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      }
    };
    checkAuth();
  }, []);

  const loginUser = async (username: string, password: string): Promise<boolean> => {
    try {
      const data = await login(username, password);
      if (data.success) {
        const { token, user } = data;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setUser(user);
        setUserLevel(user.level);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setToken(null);
      setUser(null);
      setUserLevel(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userLevel, user, token, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;