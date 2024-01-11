import React, { useCallback, useContext, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { ScrollView } from 'react-native-virtualized-view'

import {
  SafeAreaView,
  StyleSheet,
  View,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import HeaderPhoto from "./Componants/HeaderPhoto";
import Bio from "./Componants/Bio";
import MiddelTab from "./Componants/MiddelTab";
import { ProfileContext } from "../../Context/ProfileContext";
import AboutProfile from "./AboutProfile/AboutProfile";
import { STYLES } from "../../../GlobalCss";
import Activity from "./ActivityProfile/Activity";

function ProfileScreen() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../../../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("../../../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("../../../assets/fonts/Roboto-Medium.ttf"),
  });

  const { activeMiddleTab, LoadingProfile, refetchProfile } =
    useContext(ProfileContext);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetchProfile();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (!fontsLoaded || LoadingProfile) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={STYLES.COLORS.Priamary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
        {activeMiddleTab === "Activity" && <Activity />}
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

export default ProfileScreen;
