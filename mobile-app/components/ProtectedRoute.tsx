import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Redirect } from 'expo-router';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedLevel: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedLevel }) => {
  const { isAuthenticated, userLevel } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  if (allowedLevel && userLevel !== allowedLevel) {
    return <Redirect href="/(auth)/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;