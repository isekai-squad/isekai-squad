import React, { useContext, useEffect, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import { ScrollView } from "@gluestack-ui/themed";
import StartCover from "./Componants/StartCover";
import PremiumRecommendation from "./Componants/PremiumRecommendation";
import { ProfileContext } from "../../Context/ProfileContext";
import RecentProjects from "./Componants/RecentProjects";
import StudentProfiles from "./Componants/Profiles/StudentProfiles";
import CompanyProfile from "./Componants/Profiles/CompanyProfile";
import AdvisorProfile from "./Componants/Profiles/AdvisorProfile";
import AllServecies from "./Componants/AllServecies";
import Footer from "./Componants/Footer";
import { STYLES } from "../../../GlobalCss";

function HomeScreen(status) {
  const { ProfileData, setShowTabBar, welcome } = useContext(ProfileContext);

  const handleScroll = function (event) {
    if (event.nativeEvent.contentOffset.y >= 2200) {
      setShowTabBar(false);
    } else {
      setShowTabBar(true);
    }
  };

  return (
    <>
      <ScrollView style={{ flex: 1 }} onScroll={handleScroll}>
        <SafeAreaView
          style={{
            backgroundColor: "white",
            flex: 1,
            height: "100%",
          }}
        >
          <StartCover />
          {welcome && (
            <View style={styles.container}>
              <Text style={styles.welcomeText}>
                Welcome {ProfileData.name}! Your account has been upgraded.
              </Text>
              <Text style={styles.infoText}>
                To view your most popular and recent projects, simply access
                your account on your browser for the best experience.
              </Text>
            </View>
          )}

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
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: STYLES.COLORS.Priamary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 20,
    elevation: 10,
    width: 300,
    borderRadius: 5,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    color: STYLES.COLORS.Secondry,
    letterSpacing: 1,
  },
});

export default HomeScreen;
