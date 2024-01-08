import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MainContainer } from "./App/bottomTabScreen/MainContainer";
import SearchHeader from "./App/component/SearchHeader";
import SignIn from "./App/Screens/Authentication/SignIn/SignIn";
import Signup from "./App/Screens/Authentication/signUp/signup";
import QR_code from "./App/component/QR_code";
import FlexDimensionsBasics from "./App/bottomTabScreen/About/AboutScreen";
import EditProfile from "./App/Screens/EditProfile/EditProfileScreen";
import { ProfileProvider } from "./App/Context/ProfileContext";
const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
       <ProfileProvider >
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
          name="EditProfile"
          component={EditProfile}
          options={{
            headerTitle: "",
            headerLeft: null,
            headerStyle: { height: 50 },
          }}
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
      </ProfileProvider>

    </NavigationContainer>
  );
};
