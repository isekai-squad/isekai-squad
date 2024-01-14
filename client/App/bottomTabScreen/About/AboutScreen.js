import React, { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const AboutScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState({
    name: "Ameur Koidja",
    qrCodeUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOjynLaramHQQQCsoObb7Jpp9ebhcy98dxiA&usqp=CAU",
    profileImageUrl: "https://picsum.photos/200",
  });

  const handleLogin = () => {
    <QRCode value="http://awesome.link.qr" />;
    setUser({
      name: "New User",
      qrCodeUrl: "https://example.com/newQRCode",
      profileImageUrl: "https://example.com/newProfileImage",
    });
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

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.code}>My code</Text>
        <TouchableOpacity onPress={() => navigation.navigate("QRCode")}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Scan</Text>
        </TouchableOpacity>
      </View>
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
        <Image
          source={{
            uri: user.qrCodeUrl,
          }}
          style={styles.codeQr}
        />
      </View>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="save-alt"
            size={18}
            color={"black"}
            style={styles.materialIcons}
          />
          <Text style={styles.save} onPress={handleLogin}>
            Save to gallery
          </Text>
        </View>
          <Text onPress={()=>navigation.navigate('stripetest')}>go to test</Text>
        <View>
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
    justifyContent: "center",
    padding: 15,
  },
  text: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 10,
  },
  code: {
    padding: 25,
    fontSize: 20,
    justifyContent: "flex-end",
    fontWeight: "bold",
    marginBottom: 10,
    left: -60,
  },
  scan: {
    padding: 17,
    fontSize: 20,
    justifyContent: "flex-start",
    fontWeight: "bold",
    marginBottom: 10,
    left: 60,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ABB8C3",
    top: -20,
  },
  backgroundcodeQR: {
    width: 340,
    height: 380,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  antDesign: {
    alignItems: "left",
    position: "absolute",
    left: -30,
  },
  materialIcons: {
    alignItems: "left",
    position: "absolute",
    left: -30,
  },
  codeQr: {
    width: 250,
    height: 250,
    borderRadius: 50,
  },
  Arrowleft: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
  save: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 12,
  },
  share: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 11,
  },
  profileName: {
    marginTop: -10,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AboutScreen;
