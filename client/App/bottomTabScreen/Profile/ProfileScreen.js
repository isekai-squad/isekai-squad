import React, { useContext, useEffect } from "react";
import { useFonts } from "expo-font";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import HeaderPhoto from "./Componants/HeaderPhoto";
import Bio from "./Componants/Bio";
import MiddelTab from "./Componants/MiddelTab";
import { ProfileContext } from "../../Context/ProfileContext";
import AboutProfile from "./AboutProfile/AboutProfile";
import EditProfile from "./EditProfile/EditProfile";

function ProfileScreen() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../../../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("../../../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("../../../assets/fonts/Roboto-Medium.ttf"),
  });

  const { data, isLoading, isError, activeMiddleTab } =
    useContext(ProfileContext);

  if (!fontsLoaded || isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Image
          source={{
            uri: "https://img.freepik.com/premium-vector/error-404-concept-app-ui-page_637684-11.jpg?w=360",
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {activeMiddleTab === "Edit" && <EditProfile profileData={data} />}
      <View style={styles.profileContainer}>
        <HeaderPhoto profileData={data} />
        <Bio profileData={data} />
      </View>
      <MiddelTab />
      {activeMiddleTab === "About" && <AboutProfile />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
