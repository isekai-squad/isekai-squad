import React, { useContext } from "react";
import { ScrollView, View } from "react-native";
import MainSkills from "./Components/MainSkills";
import AboutMe from "./Components/AboutMe";
import { VisitProfileContext } from "../../../Context/VisitProfileContext";
function AboutProfile() {
  const { visitedProfileData } = useContext(VisitProfileContext);

  return (
    <ScrollView style={{ paddingBottom: 50 }}>
      {visitedProfileData.role === "STUDENT" && <MainSkills />} 
      
      <AboutMe />
    </ScrollView>
  );
}

export default AboutProfile;
