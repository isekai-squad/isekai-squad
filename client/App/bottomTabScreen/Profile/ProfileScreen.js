import React, { useState } from "react";
import { useFonts } from "expo-font";

import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { STYLES } from "../../../GlobalCss";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
function ProfileScreen() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../../../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("../../../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("../../../assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  const interesting = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
  ];
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={[styles.container, { fontFamily: "Roboto-Regular" }]}>
        <View>
          <ImageBackground
            resizeMode="cover"
            source={{
              uri: "https://t4.ftcdn.net/jpg/05/31/79/83/360_F_531798391_XFz7gyPmDRTAfiEE5sRjFu5NpKrJt4rC.jpg",
            }}
          >
            <View style={styles.darkness} />
          </ImageBackground>

          <View style={[styles.profileImgContainer]}>
            <Image
              source={{
                uri: "https://picsum.photos/200",
              }}
              style={styles.profileImg}
            />
            <View>
              <View style={styles.descContainer}>
                <View style={styles.descDetails}>
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
                  >
                    50
                  </Text>
                  <Text
                    style={{ color: "white", fontWeight: "300", fontSize: 15 }}
                  >
                    Projects
                  </Text>
                </View>
                <View style={styles.descDetails}>
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
                  >
                    50
                  </Text>
                  <Text
                    style={{ color: "white", fontWeight: "300", fontSize: 15 }}
                  >
                    Followers
                  </Text>
                </View>
                <View style={styles.descDetails}>
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
                  >
                    50
                  </Text>
                  <Text
                    style={{ color: "white", fontWeight: "300", fontSize: 15 }}
                  >
                    Following
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ paddingTop: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Ahmed Haddada
            </Text>
            <View style={{ flexDirection: "row", paddingVertical: 8, gap: 10 }}>
              <Text style={{ fontWeight: "300", fontSize: 15 }}>
                Tunisie,Sousse
              </Text>

              <Text style={{ fontWeight: "300", fontSize: 15 }}>|</Text>
              <Text style={{ fontWeight: "300", fontSize: 15 }}>
                Full Stack Develloper
              </Text>
            </View>
          </View>

          <ScrollView horizontal={true}>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                paddingVertical: 8,
              }}
            >
              {interesting.map((text) => (
                <TouchableOpacity
                  style={{
                    borderRadius: 20,
                    borderColor: "#b4aaaa",
                    borderWidth: 1,
                    padding: 3,
                    paddingHorizontal: 10,
                  }}
                >
                  #{text}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View
            style={{
              paddingVertical: 20,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                backgroundColor: "#8244CB",
                color: "white",
                padding: 15,
                paddingHorizontal: 60,
                borderRadius: 20,
                justifyContent: "center",
                width: "fit-content",
              }}
            >
              <AntDesign
                name="message1"
                size={20}
                color={"white"}
                style={{ paddingRight: 5 }}
              />
              Message
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: "#00000078",
                borderWidth: 1,
                borderRadius: "100%",
                padding: 12,
                alignSelf: "center",
              }}
            >
              <Entypo name="dots-three-horizontal" color={"black"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderTopColor: "red",
  },
  darkness: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: 130,
  },

  profileImgContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    gap: 20,
    width: "100%",
    alignItems: "center",
    position: "absolute",
    top: 25,
  },
  profileImg: {
    height: 80,
    width: 80,
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 100,
  },
  descContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  descDetails: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ProfileScreen;
