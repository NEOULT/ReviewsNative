import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0A1B28' },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}