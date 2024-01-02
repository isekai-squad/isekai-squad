import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./App/Pages/HomeScreen";
import AboutScreen from "./App/Pages/AboutScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home">
          {() => <Stack.Screen name="Home" component={HomeScreen} />}
        </Tab.Screen>

        <Tab.Screen name="About">
          {() => <Stack.Screen name="About" component={AboutScreen} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
