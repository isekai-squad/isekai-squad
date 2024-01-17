import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Vibration,
  useWindowDimensions,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { STYLES } from '../../../../../GlobalCss';
import { useFonts } from 'expo-font';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Step1 = ({
  setStep,
  setName,
  setUserName,
  setRole,
  name,
  userName,
  role,
  navigation,
}) => {
  const [pressed, setPressed] = useState("");
  const [errorInput, setErrorInput] = useState("");

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../../../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../../../../../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("../../../../../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("../../../../../assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    setRole(pressed);
  }, [pressed]);

  const continueToStep2 = () => {
    if (!name && !role && !userName) {
      setErrorInput("all");
      Vibration.vibrate();
    } else if (!name) {
      setErrorInput("no name");
      Vibration.vibrate();
    } else if (!role) {
      setErrorInput("no role");
      Vibration.vibrate();
    } else if (!userName) {
      setErrorInput("no userName");
      Vibration.vibrate();
    } else {
      setStep(2);
    }
  };

  const { width, height } = useWindowDimensions();

  return (
    // <KeyboardAwareScrollView
      
    // >
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    keyboardVerticalOffset={290}
  
    behavior={Platform.OS == "ios" ? "position" : "position" }
  >

    <View>


<TouchableOpacity onPress={()=>navigation.navigate('signIn')}>

<Text style={{position:'absolute',top:0,marginTop:50,marginLeft:10,fontSize:20,color:STYLES.COLORS.Priamary}}>Already Have Account?</Text>
</TouchableOpacity>
      <View style={{ width, height, justifyContent: 'center', alignItems: 'center',bottom:20 }}>
        <View style={{ gap: 20, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <TouchableOpacity
              onPress={() => setPressed("STUDENT")}
              style={
                pressed !== "STUDENT" ? Styles.IconView : Styles.PressedIconView
              }
            >
              <Feather
                style={pressed !== "STUDENT" ? Styles.Icon : Styles.PressedIcon}
                name="user"
                size={30}
                />
            </TouchableOpacity>
            {pressed !== 'STUDENT' ? (
              <Text style={{ textAlign: 'center' }}>Student</Text>
              ) : (
                <Text style={{ textAlign: 'center' }}>
                <FontAwesome color={STYLES.COLORS.Priamary} size={22} name='caret-up' />
              </Text>
            )}
          </View>
          <View style={{ gap: 40, flexDirection: "row" }}>
            <View>
              <TouchableOpacity
                onPress={() => setPressed('COMPANY')}
                style={pressed !== 'COMPANY' ? Styles.IconView : Styles.PressedIconView}
                >
                <FontAwesome style={pressed !== 'COMPANY' ? Styles.Icon : Styles.PressedIcon} name='building-o' size={30} />
              </TouchableOpacity>
              {pressed !== 'COMPANY' ? (
                <Text style={{ textAlign: 'center' }}>Company</Text>
                ) : (
                  <Text style={{ textAlign: 'center' }}>
                  <FontAwesome color={STYLES.COLORS.Priamary} size={22} name='caret-up' />
                </Text>
              )}
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setPressed('ADVISOR')}
                style={pressed !== 'ADVISOR' ? Styles.IconView : Styles.PressedIconView}
                >
                <FontAwesome5 style={pressed !== 'ADVISOR' ? Styles.Icon : Styles.PressedIcon} name='hands-helping' size={30} />
              </TouchableOpacity>
              {pressed !== 'ADVISOR' ? (
                <Text style={{ textAlign: 'center' }}>Advisor</Text>
                ) : (
                  <Text style={{ textAlign: 'center' }}>
                  <FontAwesome color={STYLES.COLORS.Priamary} size={22} name='caret-up' />
                </Text>
              )}
            </View>
          </View>
          <View style={{ marginLeft: 40, top: 20 }}>
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
            <View
              style={{
                gap: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
              >
              <View>
                <View style={Styles.loginContainer}>
                  <Feather
                    style={Styles.loginIcon}
                    name="user"
                    size={20}
                    color={"#8244CB"}
                    />
                  <TextInput
                    style={Styles.loginInput}
                    placeholder="FullName"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    />
                </View>
                {errorInput === "no name" && (
                  <Text style={{ color: "red", top: 20 }}>Enter A name</Text>
                  )}
              </View>
              <View>
                <View style={Styles.loginContainer}>
                  <Feather
                    style={Styles.loginIcon}
                    name="user-plus"
                    size={20}
                    color={"#8244CB"}
                    />
                  <TextInput
                    style={Styles.loginInput}
                    placeholder="@username"
                    value={userName}
                    onChangeText={(text) => setUserName(text)}
                    />
                </View>
                {errorInput === "no userName" && (
                  <Text style={{ color: "red" }}>Enter a username, please</Text>
                  )}
                {errorInput === "all" && (
                  <Text style={{ color: "red", top: 20 }}>
                    Please Enter All information
                  </Text>
                )}
              </View>
              <TouchableOpacity
                onPress={continueToStep2}
                style={{
                  backgroundColor: STYLES.COLORS.Priamary,
                  width: 150,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  top: 80,
                  right: 20,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Roboto-Bold",
                    fontSize: STYLES.SIZES.sizeL,
                  }}
                >
                  Next Step <Feather size={20} name="arrow-right" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      </View>
      </KeyboardAvoidingView>
    // </KeyboardAwareScrollView>
  );
};
const Styles = {
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
    height: "100%",
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
    // justifyContent: "center",
    alignItems: "center",
    right: 30,
    top: 40,
    height:60,
    width: "100%",
  },
};

export default Step1;
