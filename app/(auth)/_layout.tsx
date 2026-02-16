import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="send-email" />
      <Stack.Screen name="invalid-magic-link" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
