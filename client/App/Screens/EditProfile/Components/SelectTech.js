import React, { useContext, useMemo } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ToastAndroid } from "react-native";
import { SelectCountry } from "../../../../assets/react-native-element-dropdown";
import { ProfileContext } from "../../../Context/ProfileContext";
import { fetchTechnologie } from "../../../Context/ProfileContext";
import { STYLES } from "../../../../GlobalCss";

const SelectTech = () => {
  const { setMainSkills, mainSkills, ProfileData } = useContext(ProfileContext);
  const { specialtyId } = ProfileData;

  const { data: TechnoData, isLoading } = useQuery({
    queryKey: ["technologie"],
    queryFn: () => fetchTechnologie(specialtyId),
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color={STYLES.COLORS.Priamary} />;
  }

  return (
    <SelectCountry
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      imageStyle={styles.imageStyle}
      iconStyle={styles.iconStyle}
      maxHeight={300}
      search
      data={TechnoData}
      valueField="name"
      labelField="name"
      imageField="image"
      placeholder="Select Technologie"
      searchPlaceholder="Search..."
      onChange={(e) => {
        let selected = mainSkills.some(
          (ele) => ele.Technologies.name === e?.name
        );

        if (!selected) {
          setMainSkills((prevMainSkills) => [
            ...prevMainSkills,
            { Technologies: e },
          ]);
        } else {
          ToastAndroid.showWithGravity(
            "You already possess the skill you're trying to add. No changes made.",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
      }}
    />
  );
};

export default SelectTech;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    width: 300,
    backgroundColor: "white",
    paddingHorizontal: 8,
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 20,
  },
  imageStyle: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 18,
    marginLeft: 8,
    textTransform: "capitalize",
    letterSpacing: 2,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
