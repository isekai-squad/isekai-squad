import React from "react";
import { StripeProvider } from "@stripe/stripe-react-native";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GluestackUIProvider } from "@gluestack-ui/themed"
import { Navigation } from "./Navigation";
import { config } from "@gluestack-ui/config"
import { AuthProvider } from "./App/Context/AuthContext";
import { ProfileProvider } from "./App/Context/ProfileContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StripeProvider publishableKey={process.env.EXPO_PUBLIC_PUBLISH_KEY}>
        <AuthProvider>
      <GluestackUIProvider config={config}>
          <ProfileProvider id={1}>
      <Navigation />
          </ProfileProvider>
        </GluestackUIProvider>
    </AuthProvider>
      </StripeProvider>
    </QueryClientProvider>
  );
}