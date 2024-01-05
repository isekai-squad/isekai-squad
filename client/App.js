import React from "react";
import { Navigation } from "./Navigation";
import { AuthProvider } from "./App/Context/AuthContext";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
    <StripeProvider
    publishableKey={process.env.EXPO_PUBLIC_PUBLISH_KEY}
    >
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </StripeProvider>
  );
}
