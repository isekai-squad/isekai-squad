import React, { useContext, useState } from "react";
import { useFonts } from "expo-font";

import { SafeAreaView, StyleSheet, View, Text } from "react-native";

import HeaderPhoto from "./Componants/HeaderPhoto";
import Bio from "./Componants/Bio";
import Report from "./Componants/Report";
import MiddelTab from "./Componants/MiddelTab";
import EditProfile from "./Componants/"
function ProfileScreen() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../../../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("../../../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("../../../assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "white",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={[styles.container, { fontFamily: "Roboto-Regular" }]}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={[styles.container, { fontFamily: "Roboto-Regular" }]}>
        <HeaderPhoto />
        <Bio />
      </View>
      <Report />
      <MiddelTab />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderTopColor: "red",
  },
});
export default ProfileScreen;
