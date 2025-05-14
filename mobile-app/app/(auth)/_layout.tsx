import { Stack } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';

export default function AuthLayout() {
  const { isAuthenticated, userLevel } = useAuth();

  return (
    <Stack>
      {!isAuthenticated ? (
        <Stack.Screen name="login" options={{ headerShown: false }} />
      ) : userLevel === 'user' ? (
        <Stack.Screen name="user-dashboard" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="admin-dashboard" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}