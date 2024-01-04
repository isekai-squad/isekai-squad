import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
const FlexDimensionsBasics = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Isekai QR code</Text>
      <Text style={styles.code}>My code</Text>
      <Text style={styles.scan}>Scan</Text>
      <AntDesign name="arrowleft" size={10} color={" black"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 17,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 10,
  },
  code: {
    padding: 25,
    fontSize: 20,
    alignItems: "flex-end",
    fontWeight: "bold",
    marginBottom: 10,
  },
  scan: {
    padding: 17,
    fontSize: 20,
    alignItems: "flex-start",
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default FlexDimensionsBasics;
