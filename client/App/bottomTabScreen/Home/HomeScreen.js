import React, { useContext } from "react";
import { View } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ForumContext } from "../../Context/ForumContext";


function HomeScreen({ navigation }) {
  let {category} = useContext(ForumContext)
  console.log(category)
  return(
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("signIn")}>
        <Text>go to signIn</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("signup")}>
        <Text>go to signUp</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("chat")}>
        <Text>go to chat</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("rooms")}>
        <Text>go to ROOms</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
