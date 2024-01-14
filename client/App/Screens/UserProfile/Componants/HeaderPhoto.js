import React, { useContext } from "react";
import { Image, StyleSheet, View, Text, ImageBackground } from "react-native";
import { VisitProfileContext } from "../../../Context/VisitProfileContext";
import { STYLES } from "../../../../GlobalCss";

const HeaderPhoto = () => {
  const { visitedProfileData } = useContext(VisitProfileContext);
  const { role, active, project, posts, cover, pdp } = visitedProfileData;
  console.log("====================================");
  console.log(visitedProfileData);
  console.log("====================================");

  return (
    <View>
      <ImageBackground
        source={{
          uri: cover,
        }}
        style={styles.backgroundImage}
      >
        <View style={styles.darkOverlay} />
      </ImageBackground>

      <View style={styles.profileContainer}>
        <View>
          <Image
            source={{
              uri: pdp,
            }}
            style={styles.profileImage}
          />

          <Text style={active ? styles.active : styles.desactive}></Text>
        </View>
        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionDetails}>
            <Text style={styles.detailText}>
              {}

              {role == "STUDENT" ? project?.length : posts?.length}
            </Text>
            <Text style={styles.detailLabel}>
              {role == "STUDENT" ? "Projects" : "Posts"}
            </Text>
          </View>

          <View style={styles.descriptionDetails}>
            <Text style={styles.detailText}>62</Text>
            <Text style={styles.detailLabel}>Followers</Text>
          </View>

          <View style={styles.descriptionDetails}>
            <Text style={styles.detailText}>23</Text>
            <Text style={styles.detailLabel}>Following</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  active: {
    position: "absolute",
    bottom: 6,
    right: 3,
    width: 20,
    height: 20,
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "green",
    borderRadius: 100,
  },
  desactive: {
    position: "absolute",
    bottom: 6,
    right: 3,
    width: 20,
    height: 20,
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "red",
    borderRadius: 100,
  },
  backgroundImage: {
    width: "100%",
    height: 180,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: STYLES.COLORS.ShadowColor,
  },
  profileContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: "70%",
    transform: [{ translateY: -70 }],
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
