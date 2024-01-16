import React, { useCallback, useContext, useState } from "react";
import { useFonts } from "expo-font";
import { ScrollView } from "react-native-virtualized-view";

import {
  SafeAreaView,
  StyleSheet,
  View,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { STYLES } from "../../../GlobalCss";
import HeaderPhoto from "../../component/ProfileComponants/HeaderPhoto";
import Bio from "../../component/ProfileComponants/Bio";
import MiddelTab from "../../component/ProfileComponants/MiddelTab";
import AboutProfile from "./AboutProfile/AboutProfile";
import VisitedActivity from "./VisitedActivity";
import Report from "../../component/ProfileComponants/Report";
import { VisitProfileContext } from "../../Context/VisitProfileContext";
import { ProfileContext } from "../../Context/ProfileContext";

function UserProfile() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../../../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("../../../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("../../../assets/fonts/Roboto-Medium.ttf"),
  });

  const { activeMiddleTab, LoadingVisitedProfile } =
    useContext(VisitProfileContext);
  const { refetchProfile, setRefetchPosts, setRefetchProject } =
    useContext(ProfileContext);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefetchPosts(true);
    setRefetchProject(true);
    refetchProfile();
    setTimeout(() => {
      setRefreshing(false);
      setRefreshing(false);
      setRefetchPosts(false);
      setRefetchProject(false);
    }, 2000);
  }, []);

  if (!fontsLoaded || LoadingVisitedProfile) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={STYLES.COLORS.Priamary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Report />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.profileContainer}>
          <HeaderPhoto />
          <Bio />
        </View>
        <MiddelTab />
        {activeMiddleTab === "About" && <AboutProfile />}
        {activeMiddleTab === "Activity" && <VisitedActivity />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
  },
  profileContainer: {
    position: "relative",
    borderTopColor: "red",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontFamily: "Roboto-Regular",
    fontSize: 18,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: "blue",
  },
});

export default UserProfile;
