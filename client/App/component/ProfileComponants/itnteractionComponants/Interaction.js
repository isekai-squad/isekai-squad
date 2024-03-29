import React, { useContext } from "react";
import { useRoute } from "@react-navigation/native";
import { VisitProfileContext } from "../../../Context/VisitProfileContext";
import { ProfileContext } from "../../../Context/ProfileContext";
import StudentPostsInteraction from "./Projects/StudentProjectInteraction";
import CompanyAdvisorPostsInteraction from "./Posts/CompanyAdvisorPostsInteraction";

const Interaction = ({ postId,postOwner }) => {
  const route = useRoute();
  const { visitedProfileData } = useContext(VisitProfileContext);
  const { ProfileData } = useContext(ProfileContext);

  const isStudentProfile = (profileData) =>
    profileData.role === "STUDENT" || route.name === "Home";
  const isVisitedProfile = route.name === "Visited Profile";
  const getInteractionComponent = () => {
    return isStudentProfile(
      isVisitedProfile ? visitedProfileData : ProfileData
    ) ? (
      <StudentPostsInteraction projectId={postId} postOwner={postOwner}/>
    ) : (
      <CompanyAdvisorPostsInteraction postId={postId}  postOwner={postOwner}/>
    );
  };

  return getInteractionComponent();
};

export default Interaction;
