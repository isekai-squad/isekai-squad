import React, { useContext } from "react";
import { SafeAreaView, View } from "react-native";
import { ScrollView } from "@gluestack-ui/themed";
import StartCover from "./Componants/StartCover";
import PremiumRecommendation from "./Componants/PremiumRecommendation";
import { ProfileContext } from "../../Context/ProfileContext";
import RecentPosts from "./Componants/RecentProjects";
import RecentProjects from "./Componants/RecentProjects";
import StudentProfiles from "./Componants/Profiles/StudentProfiles";
import CompanyProfile from "./Componants/Profiles/CompanyProfile";
import AdvisorProfile from "./Componants/Profiles/AdvisorProfile";

function HomeScreen({ navigation }) {
  const { ProfileData } = useContext(ProfileContext);

  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          backgroundColor: "white",
          flex: 1,
          height: "100%",
          paddingBottom: 100,
        }}
      >
        <StartCover />

        <PremiumRecommendation />
        {/* <StudentProfiles /> */}
        {/* <CompanyProfile /> */}
        <RecentProjects />
        {/* <AdvisorProfile /> */}
        {/*

        {/* {ProfileData.role === "COMPANY" && <PremiumRecommendation />}
        {ProfileData.role === "COMPANY" && <StudentProfiles />}
        <RecentProjects />
        {ProfileData.role === "COMPANY" && <CompanyProfile />}
        {ProfileData.role === "COMPANY" && <AdvisorProfile/>} */}
      </SafeAreaView>


    </ScrollView>
  );
}

export default HomeScreen;
