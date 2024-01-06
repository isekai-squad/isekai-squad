import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View>
    <TouchableOpacity onPress={()=>navigation.navigate('test')}>
      <Text>go to test</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>navigation.navigate('Posts')}>
      <Text>go to posts</Text>
    </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
