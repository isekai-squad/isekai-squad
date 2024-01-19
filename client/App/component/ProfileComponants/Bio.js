import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Linking } from "react-native";
import { STYLES } from "../../../GlobalCss";
import { VisitProfileContext } from "../../Context/VisitProfileContext";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ProfileContext } from "../../Context/ProfileContext";
import { useRoute } from "@react-navigation/native";

const Bio = () => {
  const route = useRoute();
  const { visitedProfileData } = useContext(VisitProfileContext);
  const { ProfileData } = useContext(ProfileContext);

  let role,
    profileName,
    userName,
    location,
    Specialty,
    Linkedin,
    GitHub,
    userTechnology;

  if (route.name === "Profile") {
    profileName = ProfileData.name;
    userName = ProfileData.userName;
    location = ProfileData.location;
    role = ProfileData.role;
    Specialty = ProfileData.Specialty;
    Linkedin = ProfileData.Linkedin;
    GitHub = ProfileData.GitHub;
    userTechnology = ProfileData.userTechnology;
  } else {
    profileName = visitedProfileData.name;
    userName = visitedProfileData.userName;
    role = visitedProfileData.role;
    location = visitedProfileData.location;
    Specialty = visitedProfileData.Specialty;
    Linkedin = visitedProfileData.Linkedin;
    GitHub = visitedProfileData.GitHub;
    userTechnology = visitedProfileData.userTechnology;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{profileName}</Text>
          <Text style={styles.role}>{role}</Text>
        </View>

        <Text style={styles.username}>@ {userName}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>{location}</Text>
        <Text style={styles.detailText}>|</Text>
        <Text style={styles.detailText}>{Specialty?.name}</Text>
      </View>

      {route.name === "Visited Profile" && role !== "COMPANY" && (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: STYLES.COLORS.Priamary,
            color: "white",
            paddingVertical: 12,
            padding: 15,
            borderRadius: 50,
            justifyContent: "center",
            alignSelf: "flex-start",
            alignItems: "center",
            marginBottom: 5,
            width: "50%",
          }}
        >
          <AntDesign
            name="message1"
            size={20}
            color={"white"}
            style={{ paddingRight: 15 }}
          />
          <Text
            style={{
              color: "white",
            }}
          >
            Contact
          </Text>
        </TouchableOpacity>
      )}

      {route.name === "Visited Profile" && role === "COMPANY" && (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: STYLES.COLORS.Priamary,
            color: "white",
            paddingVertical: 12,
            padding: 15,
            borderRadius: 50,
            justifyContent: "center",
            alignSelf: "flex-start",
            alignItems: "center",
            marginBottom: 5,
            width: "50%",
          }}
        >
          <SimpleLineIcons
            name="user-follow"
            size={20}
            color={"white"}
            style={{ paddingRight: 15 }}
          />
          <Text style={{ color: "white" }}>FOLLOW</Text>
        </TouchableOpacity>
      )}

      {role == "STUDENT" && (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.interestingContainer}>
            {userTechnology.length > 0 &&
              userTechnology?.map((technologie, i) => {
                console.log(technologie);
                return (
                  <TouchableOpacity key={i} style={styles.interestingTag}>
                    <Image
                      source={{ uri: technologie.Technologies?.image }}
                      style={styles.tagImage}
                    />

                    <Text style={styles.tagText}>
                      {technologie.Technologies?.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
      )}

      {(Linkedin || GitHub) && (
        <View style={styles.socialContainer}>
          <Text style={{ fontWeight: STYLES.FONTS.Large }}>Social Links:</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {Linkedin && (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
                onPress={() => Linking.openURL(Linkedin)}
              >
                <Ionicons
                  name="logo-linkedin"
                  color={"#665ed0"}
                  size={25}
                  style={styles.icon}
                />
                <Text style={{ fontWeight: STYLES.FONTS.Large }}>LinkedIn</Text>
              </TouchableOpacity>
            )}

            {GitHub && (
              <TouchableOpacity
                onPress={() => Linking.openURL(GitHub)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Ionicons name="logo-github" size={25} style={styles.icon} />
                <Text style={{ fontWeight: STYLES.FONTS.Large }}>GitHub</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
};
const styles = {
  container: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerContainer: {
    justifyContent: "center",
    paddingTop: 10,
  },
  nameContainer: {
    flexDirection: "row",

    alignItems: "center",
    gap: 10,
  },
  name: {
    fontWeight: STYLES.FONTS.bold,
    fontSize: STYLES.SIZES.sizeL,
  },
  role: {
    fontWeight: STYLES.FONTS.Medium,
    fontSize: 11,
    marginTop: 6,
  },
  username: {
    fontWeight: STYLES.FONTS.Light,
    fontSize: 13,
    marginLeft: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    gap: 10,
  },
  detailText: {
    fontWeight: "300",
    fontSize: 15,
    textTransform: "uppercase",
  },
  socialContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingBottom: 3,
  },
  interestingContainer: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 5,
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

    textTransform: "capitalize",
  },
};

export default Bio;
