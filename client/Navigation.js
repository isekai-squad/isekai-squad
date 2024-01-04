import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { MainContainer } from "./App/bottomTabScreen/MainContainer";
import { Test } from "./App/component/Test";
import SearchHeader from "./App/component/SearchHeader";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
