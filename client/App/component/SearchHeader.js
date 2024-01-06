import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, TextInput, StyleSheet } from "react-native";

const SearchHeader = ({ value, onChangeText }) => (
  <View style={styles.searchContainer}>
    <Ionicons style={styles.searchIcon} name="search-outline" size={20} color={"#8244CB"} />
    <TextInput
      style={styles.searchInput}
      placeholder="Search Company Student..."
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "right",
    alignItems: "center",
    width: "90%",
  },
  searchInput: {
    height: 40,
    width: "100%",
    borderColor: "#dbdbdb",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 40,
    color: "#000",
  },
  searchIcon: {
   left: 30,
  },
});

export default SearchHeader;
