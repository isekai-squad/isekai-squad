import {

  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { STYLES } from "../../../../../GlobalCss";
import axios from "axios";
import { ProfileContext } from "../../../../Context/ProfileContext";
import RenderProfile from "../RenderProfile";
import { useNavigation } from "@react-navigation/native";

// ===============================FETCH=======================

const fetchStudentProfile = async () => {
  try {
    const { data } = await axios.get(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/api/users/students?limit=10`
    );
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

// ===============================FETCH=======================

const StudentProfiles = () => {
  const navigation =useNavigation()
  const { userId } = useContext(ProfileContext);
  const { data: AllStudentProfiles } = useQuery({
    queryKey: ["studentProfiles"],
    queryFn: () => fetchStudentProfile(),
    select: (data) => {
      const Profiles = data.filter((profile) => profile.id !== userId);
      return Profiles;
    },
  });

  return (
    // ================TAB==================
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 15,
        }}
      >
        <Text
          style={{
            fontWeight: STYLES.FONTS.Large,
            fontSize: STYLES.SIZES.sizeL,
          }}
        >
          Students Profile
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("SeeAll")}>
          <Text
            style={{
              color: STYLES.COLORS.Priamary,
              fontWeight: STYLES.FONTS.Large,
              fontSize: STYLES.SIZES.sizeM,
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <RenderProfile AllProfiles={AllStudentProfiles} />
    </View>
  );
};

export default StudentProfiles;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
});
