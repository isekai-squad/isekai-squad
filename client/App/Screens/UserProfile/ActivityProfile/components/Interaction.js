import React, { useContext, useEffect, useState } from "react";

import { VisitProfileContext } from "../../../../Context/VisitProfileContext";
import StudentPostsInteraction from "./Projects/StudentProjectInteraction";
import CompanyAdvisorPostsInteraction from "./Posts/CompanyAdvisorPostsInteraction";

const Interaction = ({ postId }) => {
  const { visitedProfileData } = useContext(VisitProfileContext);
  return visitedProfileData.role === "STUDENT" ? (
    <StudentPostsInteraction projectId={postId} />
  ) : (
    <CompanyAdvisorPostsInteraction postId={postId} />
  );
};

export default Interaction;
