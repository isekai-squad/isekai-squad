import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { axios } from "axios";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children, id }) => {
  // Use React Query for server state management

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => fetchProfile(id),
  });

  // Use state for local UI state
  const [reportPop, setReportPop] = useState(false);
  const [activeMiddleTab, setActiveMiddleTab] = useState("Activity");

  useEffect(() => {
    if (isError) {
      console.error("Error fetching profile:", isError);
    }
  }, [isError]);

  return (
    <ProfileContext.Provider
      value={{
        data,
        isLoading,
        isError,
        activeMiddleTab,
        setActiveMiddleTab,
        reportPop,
        setReportPop,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

// Function to fetch profile data from the server
async function fetchProfile(id) {
  
  try {
    console.log(id);
    const response = await fetch(`http://172.20.0.74:4070/api/user/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}
