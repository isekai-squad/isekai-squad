import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { STYLES } from "../../../../GlobalCss";
import { View } from "react-native";

function MiddelTab({ navigation }) {
  const [active, setActive] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.nestedContainer}>
        <TouchableOpacity
          style={styles.btnTouch}
          onPress={() => {
            setActive(0);
          }}
        >
          <AntDesign
            name={"appstore-o"}
            size={20}
            color={active === 0 ? STYLES.COLORS.Priamary : "#ab71ef"}
          />
          <Text style={active === 0 ? styles.btnActive : styles.btn}>
            Activity
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnTouch}
          onPress={() => {
            setActive(1);
          }}
        >
          <MaterialCommunityIcons
            name={"newspaper"}
            size={20}
            color={active === 1 ? STYLES.COLORS.Priamary : "#ab71ef"}
          />
          <Text style={active === 1 ? styles.btnActive : styles.btn}>
            About
          </Text>
        </TouchableOpacity>
      </View>
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
  },
  nestedContainer: {
    flexDirection: "row",
    gap: 20,
  },

  btnTouch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    stifyContent: "center",
    gap: 10,
  },

  btnActive: {
    fontSize: STYLES.SIZES.sizeM,
    fontWeight: STYLES.FONTS.bold,
    color: "black",
  },
  btn: {
    color: "#7a7a7a",
  },
});
export default MiddelTab;
