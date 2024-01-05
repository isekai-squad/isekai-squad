import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Navigation } from "./Navigation";

import { AuthProvider } from "./App/Context/AuthContext";
import { ProfileProvider } from "./App/Context/ProfileContext";

const queryClient = new QueryClient();

export default function App() {



  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProfileProvider id={1}>
          <Navigation />
        </ProfileProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
