import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { STYLES } from "../../GlobalCss";

const SearchHeader = ({ value, onChangeText }) => (
  <View style={styles.searchContainer}>
    <TouchableOpacity style={styles.iconContainer}>
      <Ionicons name="menu" size={25} color={STYLES.COLORS.Priamary} />
    </TouchableOpacity>
    <View style={styles.inputContainer}>
      <Ionicons
        name="search-outline"
        size={20}
        color={STYLES.COLORS.Priamary}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search Company Student..."
        value={value}
        onChangeText={onChangeText}
      />
    </View>
    <TouchableOpacity style={styles.iconContainer}>
      <Ionicons name="qr-code" size={25} color={STYLES.COLORS.Priamary} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", 
    width: "100%"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: 40,
    borderColor: "#dbdbdb",
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 10, 
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#000",
  },
  searchIcon: {
    marginLeft: 10,
  },
  iconContainer: {
    marginHorizontal: 10,
  },
});

export default SearchHeader;
