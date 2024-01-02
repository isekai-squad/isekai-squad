import React from "react";
import { Button } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <Button
      onPress={() => navigation.navigate("About", { title: "hello" })}
      title="Go to Second"
    />
  );
}

export default HomeScreen;
