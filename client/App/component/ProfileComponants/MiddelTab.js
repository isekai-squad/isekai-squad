import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { STYLES } from "../../../GlobalCss";
import { ProfileContext } from "../../Context/ProfileContext";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { VisitProfileContext } from "../../Context/VisitProfileContext";

function MiddelTab() {
  const navigation = useNavigation();
  const route = useRoute();
  let activeMiddleTab, setActiveMiddleTab, setReportPop;

  if (route.name === "Profile") {
    const profileContext = useContext(ProfileContext);
    activeMiddleTab = profileContext.activeMiddleTab;
    setActiveMiddleTab = profileContext.setActiveMiddleTab;
  } else {
    const visitProfileContext = useContext(VisitProfileContext);
    activeMiddleTab = visitProfileContext.activeMiddleTab;
    setActiveMiddleTab = visitProfileContext.setActiveMiddleTab;
    setReportPop = visitProfileContext.setReportPop;
  }

  const renderTabButton = (tabName, iconComponent) => (
    <TouchableOpacity
      style={styles.tabButton}
      onPress={() => setActiveMiddleTab(tabName)}
    >
      {iconComponent}
      <Text
        style={
          activeMiddleTab === tabName ? styles.activeText : styles.inactiveText
        }
      >
        {tabName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {renderTabButton(
          "Activity",
          <AntDesign
            name="appstore-o"
            size={20}
            color={
              activeMiddleTab === "Activity"
                ? STYLES.COLORS.Priamary
                : "#ab71ef"
            }
          />
        )}

        {renderTabButton(
          "About",
          <MaterialCommunityIcons
            name="newspaper"
            size={20}
            color={
              activeMiddleTab === "About" ? STYLES.COLORS.Priamary : "#ab71ef"
            }
          />
        )}
      </View>
      {route.name === "Profile" && (
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => {
            setActiveMiddleTab("Activity"), navigation.navigate("EditProfile");
          }}
        >
          <Entypo name="sound-mix" size={20} color={"#ab71ef"} />
          <Text style={styles.inactiveText}>Edit Profile</Text>
        </TouchableOpacity>
      )}

      {route.name === "Visited Profile" && (
        <TouchableOpacity
          style={{
            borderColor: "#00000078",
            borderWidth: 1,
            borderRadius: 100,
            padding: 12,
            alignSelf: "center",
          }}
          onPress={() => setReportPop((pop) => !pop)}
        >
          <Entypo name="dots-three-horizontal" color={"black"} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: "#eee",
  },
  tabContainer: {
    flexDirection: "row",
    gap: 20,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  activeText: {
    fontSize: STYLES.SIZES.sizeM,
    fontWeight: STYLES.FONTS.bold,
    color: "black",
  },
  inactiveText: {
    color: "#7a7a7a",
  },
});

export default MiddelTab;
