import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { STYLES } from "../../../../../GlobalCss";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ProfileContext } from "../../../../Context/ProfileContext";
const MainSkills = () => {
  const { ProfileData } = useContext(ProfileContext);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons
          name="star-half-outline"
          size={20}
          color={STYLES.COLORS.Priamary}
        />
        <Text style={styles.headerText}>Main Skills</Text>
      </View>
      <View style={styles.interestingContainer}>
        {ProfileData.Technologies.map((technologie, i) => (
          <TouchableOpacity key={i} style={styles.interestingTag}>
            <Image
              source={{ uri: technologie.image }}
              style={styles.tagImage}
            />

            <Text style={styles.tagText}>{technologie.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderBottomWidth: 5,
    borderColor: "#eee",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    marginLeft: 10,
    fontSize: STYLES.SIZES.sizeM,
    fontWeight: STYLES.FONTS.bold,
    color: "black",
  },

  interestingContainer: {
    flexDirection: "row",
    gap: 5,
    paddingVertical: 8,
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

export default MainSkills;
