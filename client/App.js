import React from "react";
import { GluestackUIProvider } from "@gluestack-ui/themed"
import { Navigation } from "./Navigation";
import { config } from "@gluestack-ui/config"
import { AuthProvider } from "./App/Context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <GluestackUIProvider config={config}>
      <Navigation />
    </GluestackUIProvider>
    </AuthProvider>
  );
}