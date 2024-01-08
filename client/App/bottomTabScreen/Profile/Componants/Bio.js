import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { STYLES } from "../../../../GlobalCss";
import { ProfileContext } from "../../../Context/ProfileContext";

const Bio = () => {
  const { ProfileData } = useContext(ProfileContext);
  if (!ProfileData) {
    return <Text>Loading...</Text>;
  }
  return (
    ProfileData && (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{ProfileData.name}</Text>
            <Text style={styles.role}>{ProfileData.role}</Text>
          </View>

          <Text style={styles.username}>@ {ProfileData.userName}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>{ProfileData.location}</Text>
          <Text style={styles.detailText}>|</Text>
          <Text style={styles.detailText}>{ProfileData.specialty[0].name}</Text>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
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
        </ScrollView>
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
    marginTop:6
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
