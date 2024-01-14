import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { STYLES } from "../../../../GlobalCss";
import { VisitProfileContext } from "../../../Context/VisitProfileContext";
import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const Bio = () => {
  const { visitedProfileData } = useContext(VisitProfileContext);
  const {
    name: profileName,
    role,
    userName,
    location,
    Specialty,
    userTechnology,
  } = visitedProfileData;

  const { name: specialtyName } = Specialty;

  return (
    visitedProfileData && (
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
          <Text style={styles.detailText}>{specialtyName}</Text>
        </View>
        {role !== "COMPANY" && (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: STYLES.COLORS.Priamary,
              color: "white",
              padding: 15,
              paddingHorizontal: 50,
              borderRadius: 20,
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
              marginBottom: 10,
              width: "80%",
            }}
          >
            <AntDesign
              name="message1"
              size={25}
              color={"white"}
              style={{ paddingRight: 15 }}
            />
            <Text
              style={{
                color: "white",
              }}
            >
              Send Message
            </Text>
          </TouchableOpacity>
        )}
        {role === "COMPANY" && (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: STYLES.COLORS.Priamary,
              color: "white",
              padding: 15,
              paddingHorizontal: 50,
              borderRadius: 50,
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
              marginBottom: 10,
              width: "60%",
            }}
          >
            <SimpleLineIcons
              name="user-follow"
              size={25}
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
                  return (
                    <TouchableOpacity key={i} style={styles.interestingTag}>
                      <Image
                        source={{ uri: technologie.Technologies.image }}
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
      </View>
    )
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

    textTransform: "capitalize",
  },
};

export default Bio;
