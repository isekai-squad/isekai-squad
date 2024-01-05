import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { STYLES } from "../../../../../GlobalCss";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ProfileContext } from "../../../../Context/ProfileContext";

const AboutMe = () => {
  const { data: profileData, isLoading, isError } = useContext(ProfileContext);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  // if (isError) {
  // return (
  //   <SafeAreaView style={styles.errorContainer}>
  //     <Image
  //       source={{
  //         uri: "https://img.freepik.com/premium-vector/error-404-concept-app-ui-page_637684-11.jpg?w=360",
  //         width: "100%",
  //         height: "100%",
  //       }}
  //       resizeMode="cover"
  //     />
  //   </SafeAreaView>
  // )}

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
        <Text style={styles.value}>{profileData.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>(+216) {profileData.number}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{profileData.email}</Text>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.label}>Bio:</Text>
        <Text style={styles.bioText}>{profileData.bio}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderBottomWidth: 5,
    borderColor: "#eee",
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
    color: "rgba(0,0,0,0.5)",
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
