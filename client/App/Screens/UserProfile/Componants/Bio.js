import React, { useContext, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { STYLES } from "../../../../GlobalCss";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { ProfileContext } from "../../../Context/ProfileContext";

function Bio() {
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
  const { setReportPop } = useContext(ProfileContext);
  return (
    <View style={{ paddingHorizontal: 20 ,borderBottomWidth:1 ,borderColor:"#eee"}}>
      <View style={{ paddingTop: 10 }}>
        <Text style={{ fontWeight: STYLES.FONTS.bold, fontSize: 20 }}>
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
              <Text>#{text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          paddingVertical: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: STYLES.COLORS.Priamary,
            color: "white",
            padding: 15,
            paddingHorizontal: 90,
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
          <Text style={{ color: "white" }}>Message</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderColor: "#00000078",
            borderWidth: 1,
            borderRadius: 100,
            padding: 12,
            alignSelf: "center",
          }}
          onPress={() => setReportPop((pop) => !pop)}
        >
          <Entypo name="dots-three-horizontal" color={"black"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Bio;
