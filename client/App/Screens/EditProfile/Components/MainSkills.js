import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ProfileContext } from "../../../Context/ProfileContext";
import SelectTech from "./SelectTech";
import { STYLES } from "../../../../GlobalCss";

export default function MainSkills() {
  const { mainSkills, setMainSkills, showSelectTech, setShowSelectTech } =
    useContext(ProfileContext);

  return (
    <SafeAreaView>
      <View style={styles.fieldContainer}>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowSelectTech(!showSelectTech)}
        >
          <AntDesign
            name="pluscircleo"
            size={20}
            color={STYLES.COLORS.Priamary}
          />
          <Text style={STYLES.COLORS.Priamary}>Add New Skills</Text>
        </TouchableOpacity>

        {showSelectTech && <SelectTech />}

        <View style={styles.interestingContainer}>
          {mainSkills?.map((technologie, i) => (
            <TouchableOpacity
              key={i}
              style={styles.interestingTag}
              onPress={() => {
                const updatedSkills = mainSkills.filter(
                  (tech) => tech.name !== technologie.name
                );

                setMainSkills(updatedSkills);
              }}
            >
              <Image
                source={{ uri: technologie.image }}
                style={styles.tagImage}
              />
              <Text style={styles.tagText}>{technologie.name}</Text>

              <Ionicons name="close-circle-sharp" size={18} color={"black"} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    height: 40,
    borderColor: "#dbdbdb",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  interestingContainer: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#eeeeee99",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    flexWrap: "wrap",
    // marginTop: 10,
    marginVertical: 15,
  },
  interestingTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 20,
    borderColor: "#b4aaaa",
    borderWidth: 1,
    padding: 3,
    paddingHorizontal: 10,
  },
  tagImage: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },
  tagText: {
    color: "#555",
    fontSize: 13,
  },
});
