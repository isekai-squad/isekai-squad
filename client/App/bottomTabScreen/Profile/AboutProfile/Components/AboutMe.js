import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { STYLES } from "../../../../../GlobalCss";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ProfileContext } from "../../../../Context/ProfileContext";

const AboutMe = () => {
  const { ProfileData } = useContext(ProfileContext);



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          name={"contacts-outline"}
          size={20}
          color={STYLES.COLORS.Priamary}
        />
        <Text style={styles.header}>About Me</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{ProfileData.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>(+216) {ProfileData.number}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{ProfileData.email}</Text>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.label}>Bio:</Text>
        <Text style={styles.bioText}>{ProfileData.bio}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    marginLeft: 10,
    fontSize: STYLES.SIZES.sizeM,
    fontWeight: STYLES.FONTS.bold,
    color: "black",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: STYLES.SIZES.sizeM,
    fontWeight: STYLES.FONTS.bold,
    marginRight: 10,
    color: STYLES.COLORS.ShadowColor,
  },
  value: {
    fontSize: STYLES.SIZES.sizeM,
    color: STYLES.COLORS.MediumText,
  },
  bioContainer: {
    marginTop: 20,
  },
  bioText: {
    fontSize: STYLES.SIZES.sizeM,
    color: STYLES.COLORS.LightText,
  },
});

export default AboutMe;
