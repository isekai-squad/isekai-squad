import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { STYLES } from "../../../../GlobalCss";
import AntDesign from "react-native-vector-icons/AntDesign";

const Footer = () => {
  return (
    <View
      style={{
        backgroundColor: "#f7efe5",
        elevation: 10,
        shadowColor: STYLES.COLORS.ShadowColor,
        width: "100%",
        paddingVertical: 20,
        // paddingHorizontal: 20,
        borderTopColor: "#eee",
        borderTopWidth: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          width: "50%",
        }}
      >
        <Image
          source={{ uri: "https://i.imgur.com/KyAazUD.png" }}
          width={100}
          height={50}
        />
        <Text
          style={{
            color: STYLES.COLORS.Priamary,
            textAlign: "left",
            fontWeight: STYLES.FONTS.Medium,
          }}
        >
          &copy; 2024 Your Isekai. All rights reserved. This application is
          protected by copyright .
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 20, paddingTop: 15 }}>
        <TouchableOpacity>
          <AntDesign
            name="instagram"
            size={25}
            color={STYLES.COLORS.Priamary}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name="github"
            size={25}
            color={STYLES.COLORS.Priamary}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name="linkedin-square"
            size={25}
            color={STYLES.COLORS.Priamary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({});
