import React, { useContext } from "react";
import HomeScreen from "./Home/HomeScreen";
import AboutScreen from "./About/AboutScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import code from "../component/QR_code";
import basket from "../component/basket";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ProfileContext } from "../Context/ProfileContext";
import ForumCategories from "../component/Posts/ForumCategories";
import CreatePost from "../component/Posts/CreatePost";
import SearchHeader from "../component/SearchHeader";
const Tab = createBottomTabNavigator();

export const MainContainer = () => {
  const { activeMiddleTab } = useContext(ProfileContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 60,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          paddingBottom: 5,
          backfaceVisibility: "hidden",
          display: activeMiddleTab == "Edit" ? "none" : "flex",
          position: "absolute",
        },

        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let iconColor;
          iconColor = focused ? "#8244CB" : "black";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={size} color={iconColor} />;
          } else if (route.name === "About") {
            iconName = focused
              ? "information-circle"
              : "information-circle-outline";
            return <Ionicons name={iconName} size={size} color={iconColor} />;
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
            return (
              <MaterialIcons name={iconName} size={size} color={iconColor} />
            );
          } else if (route.name === "Community") {
            iconName = focused ? "people" : "people-outline";
            return <Ionicons name={iconName} size={size} color={iconColor} />;
          } else if (route.name === "Post") {
            iconName = focused ? "add-circle" : "add-circle-outline";
            return <Ionicons name={iconName} size={size} color={iconColor} />;
          }
        },
      })}
      tabBarOptions={{
        labelStyle: {
          color: "black",
          top: -5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <SearchHeader
              onChangeText={(text) => console.log("Search:", text)}
            />
          ),
          headerTitleContainerStyle: { width: "100%" },
        })}
      />

      <Tab.Screen
        name="Post"
        component={CreatePost}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Community"
        component={ForumCategories}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="basket"
        component={basket}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
