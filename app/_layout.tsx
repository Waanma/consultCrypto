import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { View } from "react-native";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
        <View style={{ flex: 1}}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="homePage" />
            <Stack.Screen name="register" />
            <Stack.Screen name="cryptos/add" />
            <Stack.Screen name="cryptos/index" />
            <Stack.Screen name="cryptos/remove" />
          </Stack>
        </View>
    </QueryClientProvider>
  );
}
