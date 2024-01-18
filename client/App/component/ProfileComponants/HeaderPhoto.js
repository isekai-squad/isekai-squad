import React, { useContext } from "react";
import { Image, StyleSheet, View, Text, ImageBackground } from "react-native";
import { VisitProfileContext } from "../../Context/VisitProfileContext";
import { STYLES } from "../../../GlobalCss";
import { useRoute } from "@react-navigation/native";
import { ProfileContext } from "../../Context/ProfileContext";

const HeaderPhoto = () => {
  const route = useRoute();
  const { visitedProfileData } = useContext(VisitProfileContext);
  const { ProfileData } = useContext(ProfileContext);

  let role, active, posts, cover, pdp;

  if (route.name === "Profile") {
    role = ProfileData.role;
    posts = ProfileData.posts;
    cover = ProfileData.cover;
    pdp = ProfileData.pdp;
  } else {
    role = visitedProfileData.role;
    active = visitedProfileData.active;
    posts = visitedProfileData.posts;
    cover = visitedProfileData.cover;
    pdp = visitedProfileData.pdp;
  }

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
          {route.name === "Visited Profile" && (
            <Text style={active ? styles.active : styles.desactive}></Text>
          )}
        </View>
        <View style={styles.descriptionContainer}>
          {role !== "STUDENT" && (
            <View style={styles.descriptionDetails}>
              <Text style={styles.detailText}>{posts?.length}</Text>
              <Text style={styles.detailLabel}>Posts</Text>
            </View>
          )}

          {role !== "STUDENT" && (
            <>
              <View style={styles.descriptionDetails}>
                <Text style={styles.detailText}>62</Text>
                <Text style={styles.detailLabel}>Followers</Text>
              </View>

              <View style={styles.descriptionDetails}>
                <Text style={styles.detailText}>23</Text>
                <Text style={styles.detailLabel}>Following</Text>
              </View>
            </>
          )}
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
    height: 170,
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
    height: 100,
    width: 100,
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
    alignSelf: "center",
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
