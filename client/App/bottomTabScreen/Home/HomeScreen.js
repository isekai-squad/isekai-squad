import React, { useContext } from "react";
import { SafeAreaView, View } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import { ForumContext } from "../../Context/ForumContext";
import { ScrollView } from "@gluestack-ui/themed";
import StartCover from "./Componants/StartCover";
import PremiumRecommendation from "./Componants/PremiumRecommendation";
import { ProfileContext } from "../../Context/ProfileContext";

function HomeScreen({ navigation }) {
  let { category } = useContext(ForumContext);
  const { ProfileData } = useContext(ProfileContext);

  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          backgroundColor: "white",
          flex: 1,
          // height: "100%",
          paddingBottom: 100,
        }}
      >
        <StartCover />
        {ProfileData.role === "STUDENT" && <PremiumRecommendation />}
      </SafeAreaView> 
    </ScrollView>
  );
}

export default HomeScreen;
