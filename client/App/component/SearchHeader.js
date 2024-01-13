import React, { useContext, useRef, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { STYLES } from "../../GlobalCss";
import { useNavigation } from "@react-navigation/native";
import { ProfileContext } from "../Context/ProfileContext";

const SearchHeader = ({ value, onChangeText }) => {
  const { checkOurServices } = useContext(ProfileContext);

  const navigation = useNavigation();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (checkOurServices) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [checkOurServices]);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopAnimation = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue).stop();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity style={styles.iconContainer}>
        {checkOurServices ? (
          <Animated.View style={{ transform: [{ scale: spin }] }}>
            <Ionicons name="menu" size={25} color={STYLES.COLORS.Priamary} />
          </Animated.View>
        ) : (
          <Ionicons name="menu" size={25} color={STYLES.COLORS.Priamary} />
        )}
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
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("aboutScreen")}
      >
        <Ionicons name="qr-code" size={25} color={STYLES.COLORS.Priamary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
