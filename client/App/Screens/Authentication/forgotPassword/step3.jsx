import {
  View,
  Text,
  useWindowDimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { STYLES } from "../../../../GlobalCss";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";

const Pass3 = ({ setStep, setEmail, email, navigation }) => {
  const { width, height } = useWindowDimensions();
  const [code, setCode] = useState();
  const [error, setError] = useState();
  const [password, setPassword] = useState();
  const [conPassword, setConPassword] = useState();
  const [shown, setShown] = useState(true);
  const [shown2, setShown2] = useState(true);
  const [success, setSuccess] = useState();

  const submit = async () => {
    if (!email) return;
    if (password !== conPassword) {
      return setError("pass");
    } else {
      setError("");
    }
    const data = { email: email, newPassword: password };
    try {
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_IP}:4070/api/user/changePassword`,
        data
      );
      setSuccess(true);
      console.log(response.status);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <TouchableOpacity style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width,
            height,
            gap: 40,
          }}
        >
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: "https://i.imgur.com/KyAazUD.png" }}
          />
          {!success && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={Styles.Login}>Forgot Your Password ?</Text>
              <Text
                style={{
                  fontFamily: "Roboto-Light",
                  fontSize: STYLES.SIZES.sizeL,
                  fontWeight: "100",
                }}
              >
                Enter Your Email Down Below
              </Text>
            </View>
          )}

          <View>
            {!success ? (
              <View
                style={{
                  gap: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View onPress={Keyboard.dismiss} style={Styles.loginContainer}>
                  <Ionicons
                    style={Styles.loginIcon}
                    name="key-outline"
                    size={20}
                    color={"#8244CB"}
                  />
                  <TextInput
                    secureTextEntry={shown}
                    style={Styles.loginInput}
                    placeholder="Your Password"
                    onChangeText={(password) => setPassword(password)}
                  />
                  <TouchableOpacity
                    style={{ right: 28 }}
                    onPress={() => setShown(!shown)}
                  >
                    {shown ? (
                      <Feather size={20} name="eye" />
                    ) : (
                      <Feather size={20} name="eye-off" />
                    )}
                  </TouchableOpacity>
                </View>
                <View onPress={Keyboard.dismiss} style={Styles.loginContainer}>
                  <Ionicons
                    style={Styles.loginIcon}
                    name="key-outline"
                    size={20}
                    color={"#8244CB"}
                  />
                  <TextInput
                    secureTextEntry={shown2}
                    style={Styles.loginInput}
                    placeholder="Confirm Password"
                    onChangeText={(password) => setConPassword(password)}
                  />
                  <TouchableOpacity
                    style={{ right: 28 }}
                    onPress={() => setShown2(!shown2)}
                  >
                    {shown2 ? (
                      <Feather size={20} name="eye" />
                    ) : (
                      <Feather size={20} name="eye-off" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <Text style={Styles.Login}>Your Password Has been Updated</Text>
              </View>
            )}
            {error === "pass" && (
              <Text style={{ alignSelf: "flex-end", color: "red" }}>
                Confirmed Password is wrong
              </Text>
            )}
          </View>
          {!success ? (
            <TouchableOpacity
              onPress={() => submit()}
              style={{
                backgroundColor: STYLES.COLORS.Priamary,
                width: 150,
                height: 50,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Roboto-bold",
                  fontSize: STYLES.SIZES.sizeL,
                }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={{
                backgroundColor: STYLES.COLORS.Priamary,
                width: 150,
                height: 50,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Roboto-bold",
                  fontSize: STYLES.SIZES.sizeL,
                }}
              >
                Go Home
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  Icon: {
    color: "white",
  },
  IconView: {
    backgroundColor: STYLES.COLORS.Priamary,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  PressedIcon: {
    color: STYLES.COLORS.Priamary,
  },
  PressedIconView: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  Login: {
    color: STYLES.COLORS.Priamary,
    fontFamily: "Roboto-Bold",
    fontSize: STYLES.SIZES.sizeXL,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    // bottom: 40
  },
  loginContainer2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    bottom: 40,
    left: 7,
  },
  loginInput: {
    height: 60,
    width: "100%",
    borderColor: "#dbdbdb",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 40,
    color: "#000",
  },
  loginIcon: {
    left: 30,
  },
});
export default Pass3;
