import React, { useState, useContext, useEffect } from "react";
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
import { AuthContext } from "./App/Context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatScreen from "./App/Screens/Chat/ChatScreen";
import Basket from "./App/Screens/Basket/basket";

const Stack = createStackNavigator();
export const Navigation = () => {
  const [Token, setToken] = useState();
  const getCurrentUser = async () => {
    AsyncStorage.clear();
    await setToken((await AsyncStorage.getItem("Token")).valueOf());
  };
  useEffect(() => {
    getCurrentUser();
  }, [Token]);
  return (
    <NavigationContainer>
      {Token ? (
        <ProfileProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="tabs"
              component={MainContainer}
              options={{ headerShown: false }}
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
              name="Posts"
              component={Posts}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PostDetails"
              component={PostDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Forum"
              component={ForumCategories}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserProfile"
              component={UserProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Post"
              component={CreatePost}
              options={{ headerTitle: "", headerShown: false }}
            />
            <Stack.Screen
              name="basket"
              component={Basket}
              options={({ navigation }) => ({
                headerLeft: false,
                headerTitle: () => (
                  <SearchHeader
                    onChangeText={(text) => console.log("Search:", text)}
                  />
                ),
                headerTitleContainerStyle: { width: "100%" },
              })}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="chat"
              component={ChatScreen}
            />
          </Stack.Navigator>
        </ProfileProvider>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="signIn"
            component={SignIn}
            initialParams={{ setToken: setToken }}
          />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="signup"
              component={Signup}
              initialParams={{ setToken: setToken }}
            />
          <Stack.Screen name="forgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
