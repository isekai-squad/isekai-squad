import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import { MainContainer } from "./App/bottomTabScreen/MainContainer";
import { Test } from "./App/component/Test";
import Posts from "./App/component/Posts";




const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="tabs" component={MainContainer} options={{headerShown:false}}/>
        <Stack.Screen name="test" component={Posts} />
      </Stack.Navigator>  
    </NavigationContainer>
  );
}
