import React, { useEffect } from "react";
import { useState, useContext } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Vibration,
  useWindowDimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useFonts } from "expo-font";
import { STYLES } from "../../../../../GlobalCss";
import { axios } from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function Step2({
  setStep,
  email,
  setEmail,
  password,
  setPassword,
  conPassword,
  setConPassword,
}) {
  const [shown, setShown] = useState(true);
  const [shown2, setShown2] = useState(true);
  const [inputError, setInputError] = useState();

  const checkEmail = async () => {
    if (!email) return;
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_IP}:4070/api/user/email/${email}`
      );
      if (response.statusCode === 404) {
        setInputError("Invalid email address");
      }
    } catch (err) {}
  };
  useEffect(() => {}, [email, password]);
  const nextStep = async () => {
    checkEmail();
    if (!email && !password && !conPassword) {
      setInputError("all");
      Vibration.vibrate();
    } else if (password !== conPassword) {
      setInputError("password");
    } else {
      setStep(3);
    }
  };
  const { width, height } = useWindowDimensions();
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../../../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../../../../../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("../../../../../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("../../../../../assets/fonts/Roboto-Medium.ttf"),
  });
  return (
    // <SafeAreaView>
    <ScrollView>
      <View style={{ gap: 20, flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={{ uri: "https://i.imgur.com/KyAazUD.png" }}
            style={{ width: 200, height: 180 }}
          />
        </View>

        <View style={{ marginLeft: 20 }}>
          <Text style={Styles.SignUp}>SignUp</Text>
          <Text
            style={{
              fontFamily: "Roboto-Light",
              fontSize: STYLES.SIZES.sizeL,
              fontWeight: "100",
            }}
          >
            SignUp And Join Us
          </Text>
        </View>

        <KeyboardAvoidingView
          keyboardVerticalOffset={70}
          behavior={Platform.OS == "ios" ? "padding" : undefined}
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            flex: 1,
          }}
        >
          <View>
            <View style={{ ...Styles.loginContainer, right: 5 }}>
              <Fontisto
                style={Styles.loginIcon}
                name="email"
                size={20}
                color={"#8244CB"}
              />
              <TextInput
                style={Styles.loginInput}
                placeholder="Your Email"
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            {inputError === "Invalid email address" && (
              <Text style={{ color: "red", left: 20 }}>
                An Account with this email already exists
              </Text>
            )}
          </View>
          <View style={{ ...Styles.loginContainer, left: 0 }}>
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
            ></TextInput>
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
          <View>
            <View style={{ ...Styles.loginContainer, left: 10 }}>
              <Ionicons
                style={Styles.loginIcon}
                name="key-outline"
                size={20}
                color={"#8244CB"}
              />
              <TextInput
                secureTextEntry={shown2}
                style={Styles.loginInput}
                placeholder="Confirm Your Password"
                onChangeText={(password) => setConPassword(password)}
              ></TextInput>
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
            {inputError === "all" && (
              <Text style={{ color: "red", left: 20 }}>
                Enter Full Information Please
              </Text>
            )}
            {inputError === "password" && (
              <Text style={{ color: "red", left: 20 }}>
                Confirmed password is wrong
              </Text>
            )}
          </View>
        </KeyboardAvoidingView>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => nextStep()}
            style={{
              backgroundColor: STYLES.COLORS.Priamary,
              width: 150,
              height: 50,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              //  top:40,
              //  right:18
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Roboto-bold",
                fontSize: STYLES.SIZES.sizeL,
              }}
            >
              Next Step <Feather size={20} name="arrow-right" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
}
const Styles = StyleSheet.create({
  SignUp: {
    color: STYLES.COLORS.Priamary,
    fontFamily: "Roboto-Bold",
    fontSize: STYLES.SIZES.sizeXL,
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
});
export default Step2;
