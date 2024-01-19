import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useQuery, useInfiniteQuery, useMutation } from "@tanstack/react-query";

export const VisitProfileContext = createContext();

export const VisitProfileProvider = ({ children }) => {
  const [visitedProfileData, setVisitedProfileData] = useState({});
  const [activeMiddleTab, setActiveMiddleTab] = useState("Activity");

  const [visitedProfileId, setVisitedProfileId] = useState("");

  const modalRef = useRef(null);
  const openModal = () => modalRef?.current?.open();

  // ===========================REFETCH PART===========================

  const [refetchVisitedPosts, setRefetchVisitedPosts] = useState(false);

  // ================================REFETCH PART======================

  const {
    data: VisitedProfileData,
    isLoading: LoadingVisitedProfile,
    refetch: refetchVisitedProfile,
  } = useQuery({
    queryKey: ["profile", visitedProfileId],
    queryFn: () => fetchProfile(visitedProfileId),
    enabled: Boolean(visitedProfileId),
  });

  useEffect(() => {
    if (VisitedProfileData) {
      setVisitedProfileData(VisitedProfileData);
    }
  }, [VisitedProfileData]);

  return (
    <VisitProfileContext.Provider
      value={{
        visitedProfileId,
        setVisitedProfileId,
        LoadingVisitedProfile,
        refetchVisitedProfile,
        visitedProfileData,
        setVisitedProfileData,
        activeMiddleTab,
        setActiveMiddleTab,
        refetchVisitedPosts,
        setRefetchVisitedPosts,
        modalRef,
        openModal,
      }}
    >
      {children}
    </VisitProfileContext.Provider>
  );
};

async function fetchProfile(userId) {
  try {
    const response = await fetch(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/api/user/${userId}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}
