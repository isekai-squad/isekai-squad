import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
export const Test = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("../../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text style={style.text}>Test</Text>
      <Text>Test</Text>
    </View>
  );
};

const style = StyleSheet.create({
  text: {
    fontSize: 60,
    color: "red",
    fontFamily: "Roboto-Regular",
  },
});
