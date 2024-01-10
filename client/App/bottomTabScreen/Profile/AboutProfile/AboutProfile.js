import React from "react";
import { ScrollView, View } from "react-native";
import MainSkills from "./Components/MainSkills";
import AboutMe from "./Components/AboutMe";
function AboutProfile() {
  return (
    <ScrollView style={{paddingBottom:100}} >
      <MainSkills  />
      <AboutMe />
    </ScrollView>
  );
}

export default AboutProfile;
