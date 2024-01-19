import React, { useContext, useEffect } from "react";
import HomeScreen from "./Home/HomeScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ProfileContext } from "../Context/ProfileContext";
import ForumCategories from "../component/Posts/ForumCategories";
import CreatePost from "../component/Posts/CreatePost";
import SearchHeader from "../component/SearchHeader";
import NotificationBell from "../component/Notifications/NotificationBell";
import Notification from "../component/Notifications/NotificationPage";
import { Badge, BadgeText, Box, VStack } from "@gluestack-ui/themed";
const Tab = createBottomTabNavigator();
import io from "socket.io-client";

const socket = io(`http://${process.env.EXPO_PUBLIC_API_URL}:4070`);

export const MainContainer = () => {
  const { activeMiddleTab, showTabBar } =
    useContext(ProfileContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 70,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
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
          } else if (route.name === "Notifications") {
            return (
              <Box alignItems="center">
                <VStack>
                  <Badge
                    h={22}
                    w={22}
                    bg="$red600"
                    borderRadius="$full"
                    mb={-12}
                    mr={-12}
                    zIndex={1}
                    variant="solid"
                    alignSelf="flex-end"
                  >
                    <BadgeText color="$white">0</BadgeText>
                  </Badge>
                  <NotificationBell
                    focused={focused}
                    size={size}
                    iconColor={iconColor}
                  />
                </VStack>
              </Box>
            );
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
          tabBarVisible: false,
          tabBarStyle: { display: showTabBar ? "flex" : "none" 
         , height: 70,
        
        },

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
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notification}
        options={{
          headerRight: () => <Ionicons name="settings-outline" size={26} />,
          headerTitleStyle: { fontSize: 26, fontWeight: "600" },
          headerStyle: { height: 80 },
          headerLeft: () => <Ionicons name="arrow-back" size={40} />,
        }}
      />
    </Tab.Navigator>
  );
};
