import React from "react";
import { StripeProvider } from "@stripe/stripe-react-native";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Navigation } from "./Navigation";

import { AuthProvider } from "./App/Context/AuthContext";
import { ProfileProvider } from "./App/Context/ProfileContext";

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
         
            <Navigation />
        </AuthProvider>
      </StripeProvider>
    </QueryClientProvider>
  );
}
