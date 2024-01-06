import React from "react";
import { Image, StyleSheet, View, Text, ImageBackground } from "react-native";

const HeaderPhoto = ({ profileData }) => {
  return (
    <View>
      <ImageBackground
        source={{
          uri: profileData.cover,
        }}
        style={styles.backgroundImage}
      >
        <View style={styles.darkOverlay} />
      </ImageBackground>

      <View style={styles.profileContainer}>
          <Image
            source={{
              uri: profileData.pdp,
            }}
            style={styles.profileImage}
          />

        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionDetails}>
            <Text style={styles.detailText}>{profileData.project.length}</Text>
            <Text style={styles.detailLabel}>Projects</Text>
          </View>

          <View style={styles.descriptionDetails}>
            <Text style={styles.detailText}>50</Text>
            <Text style={styles.detailLabel}>Followers</Text>
          </View>

          <View style={styles.descriptionDetails}>
            <Text style={styles.detailText}>50</Text>
            <Text style={styles.detailLabel}>Following</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({


  backgroundImage: {
    width: "100%",
    height: 130,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  profileContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 25,
    width: "100%",
  },
  profileImage: {
    height: 90,
    width: 90,
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 100,
  },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  descriptionDetails: {
    justifyContent: "center",
    alignItems: "center",
  },
  detailText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  detailLabel: {
    color: "white",
    fontWeight: "300",
    fontSize: 15,
  },
});

export default HeaderPhoto;
