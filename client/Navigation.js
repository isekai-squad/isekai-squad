import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Posts from "./App/component/Posts";
import { MainContainer } from "./App/bottomTabScreen/MainContainer";
import { Test } from "./App/component/Test";
import SearchHeader from "./App/component/SearchHeader";
import PostDetails from "./App/component/PostDetails";

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
        <Stack.Screen name="test" component={Test} />
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="PostDetails" component={PostDetails} options={{headerShown : false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
