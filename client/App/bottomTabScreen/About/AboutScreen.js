import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const AboutScreen = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [user, setUser] = useState({
    profileImageUrl: "https://example.com/profile.jpg",
    qrCodeUrl: "https://example.com/qrcode.jpg",
  });

  const setInputValue = (text) => {
    setInput(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Arrowleft}>
        <FontAwesome5
          name="arrow-alt-circle-left"
          
          size={30}
          color={"#8244CB"}
          onPress={() => navigation.navigate("Home")}
        />
        <Text style={styles.text}>Isekai QR code</Text>
        <TouchableOpacity onPress={() => navigation.navigate("QRCode")}>
          <AntDesign name="scan1" size={40}  color={"#8244CB"} />
        </TouchableOpacity>
      </View>

      <View style={styles.codeSection}>
        <Text style={styles.code}>My code</Text>

        <View style={styles.backgroundcodeQR}>
          <View style={styles.profileImgContainer}>
            <Text style={styles.profileName}>{user.name}</Text>
          </View>
          <QRCode
            value={`http://localhost
            :3000/${user.name}`}
            size={200}
          />
        </View>
      </View>

      <View>
        <View style={styles.saveContainer}>
          <MaterialIcons
            name="save-alt"
            size={18}
            color={"black"}
            style={styles.materialIcons}
          />
          <Text style={styles.save}>Save to gallery</Text>
        </View>

        <View style={styles.shareContainer}>
          <AntDesign
            name="sharealt"
            size={18}
            color={"black"}
            style={styles.antDesign}
          />
          <Text style={styles.share}>Share my code</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 15,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  Arrowleft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  codeSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  code: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scanText: {
    color: "#8244CB",
    marginBottom: 20,
  },
  backgroundcodeQR: {
    width: 300,
    height: 350,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImgContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#ABB8C3",
  },
  profileName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  generateButton: {
    color: "#8244CB",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  saveContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  save: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
  },
  shareContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  share: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 5,
  },
});

export default AboutScreen;
