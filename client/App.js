import React, { useContext, useEffect, useState } from "react";
import { StripeProvider } from "@stripe/stripe-react-native";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Navigation } from "./Navigation";
import { config } from "@gluestack-ui/config";
import { AuthProvider } from "./App/Context/AuthContext";
import { ForumContext, ForumProvider } from "./App/Context/ForumContext";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";

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

const socket = io(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070`)

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StripeProvider publishableKey={process.env.EXPO_PUBLIC_PUBLISH_KEY}>
        <AuthProvider>
              <ForumProvider>
      <GluestackUIProvider config={config}>
            <Navigation />
          </GluestackUIProvider>
              </ForumProvider>
    </AuthProvider>
      </StripeProvider>
    </QueryClientProvider>
  );
}
