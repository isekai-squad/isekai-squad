import React, { useState, useEffect } from "react";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import Posts from "./App/component/Posts/Posts";
import { MainContainer } from "./App/bottomTabScreen/MainContainer";
import SearchHeader from "./App/component/SearchHeader";
import PostDetails from "./App/component/Posts/PostDetails";
import EditProfile from "./App/Screens/EditProfile/EditProfileScreen";
import SignIn from "./App/Screens/Authentication/SignIn/SignIn";
import Signup from "./App/Screens/Authentication/signUp/signup";
import QR_code from "./App/component/QR_code";
import AboutScreen from "./App/bottomTabScreen/About/AboutScreen";
import { ProfileProvider } from "./App/Context/ProfileContext";
import { VisitProfileProvider } from "./App/Context/VisitProfileContext";
import ForumCategories from "./App/component/Posts/ForumCategories";
import UserProfile from "./App/Screens/UserProfile/VisitedProfile";
import CreatePost from "./App/component/Posts/CreatePost";
import ForgotPassword from "./App/Screens/Authentication/forgotPassword/ForgotPassword";
import ChatScreen from "./App/Screens/Chat/ChatScreen";
import Basket from "./App/Screens/Basket/basket";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { STYLES } from "./GlobalCss";
import * as SecureStore from "expo-secure-store";
import UserChatRoom from "./App/Screens/Chat/UserChatRoom";
import FavoriteList from "./App/Service/favoritList";
import service from "./App/Service/service";

import postServices from "./App/component/PostServices.js";
import ServiceDetails from "./App/Service/ServiceDetatUser";
import CreateForumPost from "./App/component/Posts/CreateForumPost";
import commentsDetails from "./App/component/Posts/CommentsDetails";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import InterviewRequest from "./App/component/Interviews/InterviewRequest";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const socket = io(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070`)

const DrawerNavigator = ({ params }) => {
  const [user , setUser] = useState()
  const route = useRoute();
  const { setToken } = route.params;
  const logout = async () => {
    await SecureStore.deleteItemAsync("Token");
    setToken(null);
  };

  const getCurrentUser = async () => {
    try {
      const res = await SecureStore.getItemAsync("Token");
      const decodeResult = jwtDecode(res);
      setUser(decodeResult);
    }catch (err) {
      console.log(err)
    }
    }

    useEffect(() => {
      getCurrentUser();
      socket.emit('userConnected' , user)
      return () => {
        socket.off('disconnect')
      }
    },[])
  // logout();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: { paddingTop: 20 },
      }}
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            icon={() => <MaterialIcons name="logout" size={25} />}
            label="Logout"
            onPress={() => logout()}
          />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="Home"
        component={MainContainer}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={focused ? STYLES.COLORS.Priamary : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Visited Profile"
        component={UserProfile}
        options={{
          headerLeft: false,
          headerTitle: () => (
            <SearchHeader
              onChangeText={(text) => console.log("Search:", text)}
            />
          ),
          headerTitleContainerStyle: { width: "100%" },
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="person"
              size={size}
              color={focused ? STYLES.COLORS.Priamary : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
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
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="basket"
              size={size}
              color={focused ? STYLES.COLORS.Priamary : "black"}
            />
          ),
        })}
      />

      <Drawer.Screen
        name="rooms"
        component={UserChatRoom}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={size}
              color={focused ? STYLES.COLORS.Priamary : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="QRCode"
        component={QR_code}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="qr-code"
              size={size}
              color={focused ? STYLES.COLORS.Priamary : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorite"
        component={FavoriteList}
        options={{
          // headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Fontisto
              name="favorite"
              size={size}
              color={focused ? STYLES.COLORS.Priamary : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Services"
        component={service}
        options={{
          // headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <AntDesign
              name="customerservice"
              size={size}
              color={focused ? STYLES.COLORS.Priamary : "black"}
            />
          ),
        }}
      />
     
  

      <Drawer.Screen
        name="Post Services"
        component={postServices}
        options={{
          // headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <AntDesign
              name="addfile"
              size={size}
              color={focused ? STYLES.COLORS.Priamary : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="information-circle"
              size={size}
              color={focused ? STYLES.COLORS.Priamary : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen 
         name="Requests"
         component={InterviewRequest}
         options={{headerShown : false ,
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="nuclear"
            size={size}
            color={focused? STYLES.COLORS.Priamary : "black"}/>)}}      
      />
    </Drawer.Navigator>
  );
};
export const Navigation = () => {
  const [Token, setToken] = useState();
  const [auth, setAuth] = useState();
  const [user, setUser] = useState();
  const getCurrentUser = async () => {
    const res = await SecureStore.getItemAsync("Token");
    setAuth(res);
  };


  useEffect(() => {
    getCurrentUser();
  }, [Token]);
  return (
    <NavigationContainer>
      {auth ? (
        <ProfileProvider>
          <VisitProfileProvider>
            <Drawer.Navigator>
              <Stack.Screen
                name="Home"
                component={DrawerNavigator}
                options={{ headerShown: false }}
                initialParams={{ setToken: setToken }}
              />
              <Stack.Screen
                name="QRCode"
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
                name="ServiceDetails"
                component={ServiceDetails}
                // options={{ headerShown: false }}
              />
              <Stack.Screen
                name="chat"
                component={ChatScreen}
                options={{
                  headerShown: false,
                  drawerItemStyle: {
                    height: 0,
                  },
                  drawerIcon: ({ focused, size }) => (
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      size={size}
                      color={focused ? STYLES.COLORS.Priamary : "black"}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="Forum"
                component={ForumCategories}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Post"
                component={CreatePost}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                  // drawerItemStyle: {
                  //   height: 0,
                  // },
                  headerShown: false,
                  drawerLockMode: "",
                }}
              />
              <Drawer.Screen 
                name="CreateForumPost"
                component={CreateForumPost}
                options={{
                  headerShown : false
                }}
              />
              <Drawer.Screen
              name='CommentsDetails'
              component={commentsDetails}
              options={{headerShown : false}}
              />
            </Drawer.Navigator>
          </VisitProfileProvider>
        </ProfileProvider>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="signup"
            component={Signup}
            initialParams={{ setToken: setToken }}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="signIn"
            component={SignIn}
            initialParams={{ setToken: setToken }}
          />
          <Stack.Screen name="forgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
