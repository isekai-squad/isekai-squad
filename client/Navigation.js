import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MainContainer } from "./App/bottomTabScreen/MainContainer";
import { Test } from "./App/component/Test";
import SearchHeader from "./App/component/SearchHeader";
import SignIn from "./App/Screens/Authentication/SignIn/SignIn";
import Signup from "./App/Screens/Authentication/signUp/signup";
import QR_code from "./App/component/QR_code";
import FlexDimensionsBasics from "./App/bottomTabScreen/About/AboutScreen";
const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="tabs"
          component={MainContainer}
          options={({ navigation }) => ({
            headerTitle: () => (
              <SearchHeader
                onChangeText={(text) => console.log("Search:", text)}
              />
            ),
            headerTitleContainerStyle: { width: "100%" },
          })}
        />
        <Stack.Screen
          name="aboutScreen"
          component={FlexDimensionsBasics}
          options={{ headerShown: false }}
        />
      
        <Stack.Screen
          name="ScanCode"
          component={QR_code}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="signIn"
          component={SignIn}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="signUp"
          component={Signup}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
