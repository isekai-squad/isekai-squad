import React from "react";
import { StripeProvider } from "@stripe/stripe-react-native";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GluestackUIProvider } from "@gluestack-ui/themed"
import { Navigation } from "./Navigation";
import { config } from "@gluestack-ui/config"
import { AuthProvider } from "./App/Context/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      retry: 3,
      retryDelay: 1000,
      staleTime: 10 * (60 * 1000),
      cacheTime: 15 * (60 * 1000),
      refetchOnMount: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StripeProvider publishableKey={process.env.EXPO_PUBLIC_PUBLISH_KEY}>
        <AuthProvider>
      <GluestackUIProvider config={config}>
      <Navigation />
        </GluestackUIProvider>
    </AuthProvider>
      </StripeProvider>
    </QueryClientProvider>
  );
}