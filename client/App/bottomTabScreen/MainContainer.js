import React from 'react'
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
export const MainContainer = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}  />  
        <Tab.Screen name="About" component={AboutScreen}/>
          
      </Tab.Navigator>
  )
}
