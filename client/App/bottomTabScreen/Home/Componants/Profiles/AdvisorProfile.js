import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { STYLES } from "../../../../../GlobalCss";
import axios from "axios";
import { ProfileContext } from "../../../../Context/ProfileContext";
import RenderProfile from "../RenderProfile";
// ===============================FETCH=======================

const fetchAdvisorProfile = async () => {
  try {
    const { data } = await axios.get(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/api/users/advisor?limit=10`
    );
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

// ===============================FETCH=======================
const AdvisorProfile = () => {
  const { userId } = useContext(ProfileContext);
  const { data: AllCompanyProfiles } = useQuery({
    queryKey: ["advisorProfiles"],
    queryFn: () => fetchAdvisorProfile(),
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
          Advisors Profile
        </Text>

        <TouchableOpacity>
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
      <RenderProfile AllProfiles={AllCompanyProfiles} />
    </View>
  );
};

export default AdvisorProfile;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
});
