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
import AllServecies from "./Componants/AllServecies";
import Footer from "./Componants/Footer";

function HomeScreen({ navigation }) {
  const { ProfileData, setShowTabBar } = useContext(ProfileContext);
  const handleScroll = function (event) {
    if (event.nativeEvent.contentOffset.y >= 2000) {
      setShowTabBar(false);
    } else {
      setShowTabBar(true);
    }
  };
  return (
    <ScrollView style={{ flex: 1 }} onScroll={handleScroll}>
      <SafeAreaView
        style={{
          backgroundColor: "white",
          flex: 1,
          height: "100%",
          // paddingBottom: 100,
        }}
      >
        <StartCover />
        {ProfileData.role === "COMPANY" && <PremiumRecommendation />}
        {ProfileData.role === "STUDENT" && <AllServecies />}
        {ProfileData.role !== "STUDENT" && <StudentProfiles />}
        <CompanyProfile />
        <RecentProjects />
        <AdvisorProfile />
        {ProfileData.role === "STUDENT" && <StudentProfiles />}
        {ProfileData.role !== "STUDENT" && <AllServecies />}
        <Footer />
      </SafeAreaView>


    </ScrollView>
  );
}

export default HomeScreen;
