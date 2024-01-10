import React, { useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Posts from "./App/component/Posts/Posts";
import { MainContainer } from "./App/bottomTabScreen/MainContainer";
import SearchHeader from "./App/component/SearchHeader";
import PostDetails from "./App/component/Posts/PostDetails";
import SignIn from "./App/Screens/Authentication/SignIn/SignIn";
import Signup from "./App/Screens/Authentication/signUp/signup";
import QR_code from "./App/component/QR_code";
import FlexDimensionsBasics from "./App/bottomTabScreen/About/AboutScreen";
import EditProfile from "./App/Screens/EditProfile/EditProfileScreen";
import { ProfileProvider } from "./App/Context/ProfileContext";
import ForumCategories from "./App/component/Posts/ForumCategories";
import UserProfile from "./App/Screens/UserProfile/UserProfile";
import CreatePost from "./App/component/Posts/CreatePost";
import ForgotPassword from "./App/Screens/Authentication/forgotPassword/ForgotPassword";

const Stack = createStackNavigator();

export const Navigation = () => {
  const [auth, setAuth] = useState(true);

  return (
    <NavigationContainer>
      <ProfileProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
     
            <>
              <Stack.Screen name="tabs" component={MainContainer} />
              <Stack.Screen name="aboutScreen" component={FlexDimensionsBasics} />
              <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                  headerTitle: "",
                  headerLeft: null,
                  headerStyle: { height: 50 },
                }}
              />
              <Stack.Screen name="ScanCode" component={QR_code} />
              <Stack.Screen name="Posts" component={Posts} />
              <Stack.Screen name="PostDetails" component={PostDetails} />
              <Stack.Screen name="Forum" component={ForumCategories} />
              <Stack.Screen name="UserProfile" component={UserProfile} />
              <Stack.Screen name="Post" component={CreatePost} />
            </>
          
            <>
              <Stack.Screen name="signIn" component={SignIn} />
              <Stack.Screen name="signup" component={Signup} />
              <Stack.Screen name="forgotPassword" component={ForgotPassword} />
            </>
     
        </Stack.Navigator>
      </ProfileProvider>
    </NavigationContainer>
  );
};
