import React from "react";

import { Navigation } from "./Navigation";

import { AuthProvider } from "./App/Context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
