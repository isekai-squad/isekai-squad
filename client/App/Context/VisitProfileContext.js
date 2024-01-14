import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useQuery, useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

export const VisitProfileContext = createContext();

export const VisitProfileProvider = ({ children }) => {
  const [reportPop, setReportPop] = useState(false);
  const [visitedProfileData, setVisitedProfileData] = useState({});
  const [activeMiddleTab, setActiveMiddleTab] = useState("Activity");

  const visitedProfileId = "2";

  // ===========================REFETCH PART===========================
  const [refetchPosts, setRefetchPosts] = useState("");
  const [refetchReplyComment, setRefetchReplyComment] = useState(false);
  // ================================REFETCH PART======================

  const {
    data: VisitedProfileData,
    isLoading: LoadingVisitedProfile,
    refetch: refetchVisitedProfile,
  } = useQuery({
    queryKey: ["profile", visitedProfileId],
    queryFn: () => fetchProfile(visitedProfileId),
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
        LoadingVisitedProfile,
        refetchVisitedProfile,
        visitedProfileData,
        setVisitedProfileData,
        activeMiddleTab,
        setActiveMiddleTab,
        reportPop,
        setReportPop,
        refetchPosts,
        setRefetchPosts,
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
