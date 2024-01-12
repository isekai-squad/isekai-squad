import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { STYLES } from "../../../../../GlobalCss";

const Step6 = ({ createAccount, role }) => {
  const [company, setComapny] = useState(false);

  const { width, height } = useWindowDimensions();
  return (
    <View style={{}}>
      {role === "COMPANY" && (
        <View
          style={{ alignItems: "center", width, height, gap: 30, bottom: 40 }}
        >
          <View>
            <Text style={Styles.SignUp}>Procces Done</Text>
            <Text style={{ fontSize: 25, left: 20 }}>Terms & Conditions</Text>
          </View>
          <View style={{ height: "75%" }}>
            <ScrollView style={{ width: "100%" }}>
              <View style={{ gap: 40, margin: 17 }}>
                <Text style={{ fontSize: 16 }}>
                  {" "}
                  Welcome to ISEKAI! By creating an account, you acknowledge and
                  agree to our terms and conditions. Our platform is designed to
                  assist your company in hiring efficiently and managing
                  projects seamlessly. If your account creation wasn't
                  confirmed, fret not! We've sent an email to authenticate your
                  company. Kindly follow the instructions within to activate
                  your account and unlock the full potential of [Your App Name].
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {" "}
                  {"\u2022"}{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    Non-Discrimination:
                  </Text>
                  We promote a diverse and inclusive environment. Discrimination
                  based on race, gender, ethnicity, or any other characteristic
                  is strictly prohibited.
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {" "}
                  {"\u2022"}{" "}
                  <Text style={{ fontWeight: "bold" }}>Confidentiality:</Text>
                  Your company's information and data are treated with utmost
                  confidentiality. We prioritize the security of your data.{" "}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {" "}
                  {"\u2022"}{" "}
                  <Text style={{ fontWeight: "bold" }}>Compliance:</Text> Users
                  are expected to comply with all relevant laws and regulations
                  in their respective regions.
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {" "}
                  {"\u2022"}{" "}
                  <Text style={{ fontWeight: "bold" }}>Responsible Use: </Text>{" "}
                  The platform is intended for professional use. Users are
                  expected to use the platform responsibly and ethically.
                </Text>

                <Text style={{ fontSize: 16 }}>
                  {" "}
                  We're excited to help you build a more productive and
                  successful team while maintaining a respectful and
                  collaborative community.
                </Text>
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              alignItems: "center",
              marginBottom: 20,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => createAccount()}
              style={{
                width: 200,
                height: 50,
                backgroundColor: STYLES.COLORS.Priamary,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Roboto-Bold",
                  fontSize: STYLES.SIZES.sizeXL,
                }}
              >
                Accept
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {role !== "COMPANY" && (
        <View
          style={{ alignItems: "center", width, height, gap: 30, bottom: 40 }}
        >
          <View>
            <Text style={Styles.SignUp}>Procces Done</Text>
            <Text style={{ fontSize: 25, left: 20 }}>Terms & Conditions</Text>
          </View>
          <View style={{ height: "75%" }}>
            <ScrollView style={{ width: "100%" }}>
              <View style={{ gap: 40, margin: 17 }}>
                <Text style={{ fontSize: 16 }}>
                  {" "}
                  Welcome to ISEKAI! Congratulations on successfully creating
                  your student account. You are now part of a platform dedicated
                  to enhancing your educational journey. Explore opportunities
                  to connect with potential projects and fellow students,
                  fostering collaboration and growth. Feel free to navigate and
                  utilize the features designed to make your academic experience
                  more enriching. If you have any queries or need assistance,
                  our support team is here to help. Dive into a world of
                  possibilities at ISEKAI!
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {" "}
                  {"\u2022"}{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    Non-Discrimination:
                  </Text>
                  We promote a diverse and inclusive environment. Discrimination
                  based on race, gender, ethnicity, or any other characteristic
                  is strictly prohibited.
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {" "}
                  {"\u2022"}{" "}
                  <Text style={{ fontWeight: "bold" }}>Confidentiality:</Text>
                  Your company's information and data are treated with utmost
                  confidentiality. We prioritize the security of your data.{" "}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {" "}
                  {"\u2022"}{" "}
                  <Text style={{ fontWeight: "bold" }}>Compliance:</Text> Users
                  are expected to comply with all relevant laws and regulations
                  in their respective regions.
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {" "}
                  {"\u2022"}{" "}
                  <Text style={{ fontWeight: "bold" }}>Responsible Use: </Text>{" "}
                  The platform is intended for professional use. Users are
                  expected to use the platform responsibly and ethically.
                </Text>

                <Text style={{ fontSize: 16 }}>
                  {" "}
                  We're excited to help you build a more productive and
                  successful team while maintaining a respectful and
                  collaborative community.
                </Text>
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              alignItems: "center",
              marginBottom: 20,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: 200,
                height: 50,
                backgroundColor: STYLES.COLORS.Priamary,
                alignItems: "center",
              }}
              onPress={() => createAccount()}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Roboto-Bold",
                  fontSize: STYLES.SIZES.sizeXL,
                }}
              >
                Accept
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
const Styles = StyleSheet.create({
  scrolView: {
    height: 0,
    width: 100,
    flexGrow: 1,
  },
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
  SignUp: {
    color: STYLES.COLORS.Priamary,
    fontFamily: "Roboto-Bold",
    fontSize: STYLES.SIZES.sizeXXL,
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
    right: 34,
    top: 40,
  },
  loginContainer3: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    right: 24,
    top: 40,
  },
  loginContainer2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    right: 16,
    top: 40,
  },
});
export default Step6;
