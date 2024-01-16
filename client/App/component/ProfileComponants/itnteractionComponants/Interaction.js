import React, { useContext } from "react";
import { useRoute } from "@react-navigation/native";
import { VisitProfileContext } from "../../../Context/VisitProfileContext";
import { ProfileContext } from "../../../Context/ProfileContext";
import StudentPostsInteraction from "./Projects/StudentProjectInteraction";
import CompanyAdvisorPostsInteraction from "./Posts/CompanyAdvisorPostsInteraction";

const Interaction = ({ postId }) => {
  const route = useRoute();
  const { visitedProfileData } = useContext(VisitProfileContext);
  const { ProfileData } = useContext(ProfileContext);

  const isStudentProfile = (profileData) => profileData.role === "STUDENT";
  const isVisitedProfile = route.name === "VisitedProfile";
  const getInteractionComponent = () => {
    return isStudentProfile(
      isVisitedProfile ? visitedProfileData : ProfileData
    ) ? (
      <StudentPostsInteraction projectId={postId} />
    ) : (
      <CompanyAdvisorPostsInteraction postId={postId} />
    );
  };

  return getInteractionComponent();
};

export default Interaction;
