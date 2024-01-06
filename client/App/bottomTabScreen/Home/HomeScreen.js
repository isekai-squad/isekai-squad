import React from "react";
import { View } from "react-native";
import { Text, TouchableOpacity } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View>

    <TouchableOpacity onPress={()=>navigation.navigate('test')}>
      <Text>go to test</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>navigation.navigate('signIn')}>
      <Text>go to signIn</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>navigation.navigate('signUp')}>
      <Text>go to signUp</Text>
    </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
