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
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const AboutScreen = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [user, setUser] = useState({
    name: "John Doe",
    profileImageUrl: "https://example.com/profile.jpg",
    qrCodeUrl: "https://example.com/qrcode.jpg",
  });

  const setInputValue = (text) => {
    setInput(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Arrowleft}>
        <Text style={styles.text}>Isekai QR code</Text>
        <AntDesign
          name="arrowleft"
          size={25}
          color={"#8244CB"}
          onPress={() => navigation.navigate("Home")}
        />
      </View>

      <View style={styles.codeSection}>
        <Text style={styles.code}>My code</Text>
        <TouchableOpacity onPress={() => navigation.navigate("QRCode")}>
          <Text style={styles.scanText}>Scan</Text>
        </TouchableOpacity>

        <View style={styles.backgroundcodeQR}>
          <View style={styles.profileImgContainer}>
            <Image
              source={{
                uri: user.profileImageUrl,
              }}
              style={styles.profileImg}
            />
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
          <Text style={styles.share}>Share my code</Text>
          <AntDesign
            name="sharealt"
            size={18}
            color={"black"}
            style={styles.antDesign}
          />
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
    height: 300,
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
