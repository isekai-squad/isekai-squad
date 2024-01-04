import React from "react";
import { Text, TouchableOpacity } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('test')}>
      <Text>go to test</Text>
    </TouchableOpacity>
  );
}

export default HomeScreen;
