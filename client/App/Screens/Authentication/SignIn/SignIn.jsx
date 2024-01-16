    import React, { useState, useContext } from "react";
    import FontAwesome from "react-native-vector-icons/FontAwesome";
    import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
    import Fontisto from "react-native-vector-icons/Fontisto";
    import Ionicons from "react-native-vector-icons/Ionicons";
    import Feather from "react-native-vector-icons/Feather";
    import {
    View,
    SafeAreaView,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Vibration,
    useWindowDimensions,
    } from "react-native";
    import { AuthContext } from "../../../Context/AuthContext";
    import { STYLES } from "../../../../GlobalCss";
    import { useFonts } from "expo-font";
    import axios from "axios";
    import { useRoute } from "@react-navigation/native";
    import AsyncStorage from "@react-native-async-storage/async-storage";

    export default function SignIn({ navigation }) {
    const route = useRoute();
    const { setToken } = route.params;
    const [fontsLoaded] = useFonts({
        "Roboto-Regular": require("../../../../assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Bold": require("../../../../assets/fonts/Roboto-Bold.ttf"),
        "Roboto-Light": require("../../../../assets/fonts/Roboto-Light.ttf"),
        "Roboto-Medium": require("../../../../assets/fonts/Roboto-Medium.ttf"),
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [pressed, setPressed] = useState("");
    const [shown, setShown] = useState(true);

    const submit = async () => {
        const res = await SignInFetch(
        { email: email, password: password, role: pressed },
        navigation,
        setToken
        );
        if (res !== "success") {
        Vibration.vibrate();
        }
        setError(res);
    };

    
    const SignInFetch = async (data, navigation, setToken, pre) => {
        const { email, password } = data;
        try {
        var response = await axios.post(
            `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/api/user/signin/`,
            data
        );
        await setToken(response.data.token);

        await AsyncStorage.setItem("Token", response.data.token).then(() => {
            navigation.navigate("Home");
        });
        return "success";
        } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
            return "Invalid Credentials";
        }
        if (err.response.status === 404) {
            return "User not found";
        }
        console.log(err);
        }
    };

    const { width, height } = useWindowDimensions();

    return (
        <ScrollView style={{ flex: 1, width, height }}>
        <TouchableOpacity
            style={{
            position: "absolute",
            top: 0,
            marginTop: 50,
            marginLeft: 10,
            }}
            onPress={() => navigation.navigate("signup")}
        >
            <Text style={{ fontSize: 20, color: STYLES.COLORS.Priamary }}>
            Create Account?
            </Text>
        </TouchableOpacity>
        <SafeAreaView
            style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
            }}
        >
            <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                paddingTop: 90,
            }}
            >
            <View
                style={{
                justifyContent: "center",
                alignItems: "center",
                }}
            >
                <TouchableOpacity onPress={() => setPressed("STUDENT")}>
                <View
                    style={
                    pressed !== "STUDENT"
                        ? Styles.IconView
                        : Styles.PressedIconView
                    }
                >
                    <Feather
                    style={
                        pressed !== "STUDENT" ? Styles.Icon : Styles.PressedIcon
                    }
                    name="user"
                    size={30}
                    />
                </View>
                {pressed !== "STUDENT" ? (
                    <Text style={{ textAlign: "center" }}>Student</Text>
                ) : (
                    <Text style={{ textAlign: "center" }}>
                    <FontAwesome
                        color={STYLES.COLORS.Priamary}
                        size={22}
                        name="caret -up"
                    />
                    </Text>
                )}
                </TouchableOpacity>
                <View style={{ flexDirection: "row", gap: 84 }}>
                <TouchableOpacity onPress={() => setPressed("COMPANY")}>
                    <View
                    style={
                        pressed !== "COMPANY"
                        ? Styles.IconView
                        : Styles.PressedIconView
                    }
                    >
                    <FontAwesome
                        style={
                        pressed !== "COMPANY" ? Styles.Icon : Styles.PressedIcon
                        }
                        name="building-o"
                        size={30}
                    />
                    </View>
                    {pressed !== "COMPANY" ? (
                    <Text style={{ textAlign: "center" }}>Company</Text>
                    ) : (
                    <Text style={{ textAlign: "center" }}>
                        <Feather
                        color={STYLES.COLORS.Priamary}
                        size={22}
                        name="chevron-up"
                        />
                    </Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPressed("ADVISOR")}>
                    <View
                    style={
                        pressed !== "ADVISOR"
                        ? Styles.IconView
                        : Styles.PressedIconView
                    }
                    >
                    <FontAwesome5
                        style={
                        pressed !== "ADVISOR" ? Styles.Icon : Styles.PressedIcon
                        }
                        name="hands-helping"
                        size={30}
                    />
                    </View>
                    {pressed !== "ADVISOR" ? (
                    <Text style={{ textAlign: "center" }}>Advisor</Text>
                    ) : (
                    <Text style={{ textAlign: "center" }}>
                        <Feather
                        color={STYLES.COLORS.Priamary}
                        size={22}
                        name="chevron-up"
                        />
                    </Text>
                    )}
                </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: 300, top: 20, height: 200 }}>
                <Text style={Styles.Login}>Login</Text>
                <Text
                style={{
                    fontFamily: "Roboto-Light",
                    fontSize: STYLES.SIZES.sizeL,
                    fontWeight: "100",
                }}
                >
                Please sign in to continue
                </Text>
            </View>
            <View style={{ gap: 40, bottom: 30 }}>
                <View style={Styles.loginContainer}>
                <Fontisto
                    style={Styles.loginIcon}
                    name="email"
                    size={20}
                    color={"#8244CB"}
                />
                <TextInput
                    style={Styles.loginInput}
                    placeholder="Your Email"
                    onChangeText={(email) => setEmail(email)}
                />
                </View>
                <View style={Styles.loginContainer2}>
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
                <Text
                onPress={() => navigation.navigate("forgotPassword")}
                style={{
                    bottom: 80,
                    alignSelf: "flex-end",
                    color: "blue",
                    fontFamily: "Roboto-bold",
                }}
                >
                Forgot Password?
                </Text>
                {error === "Invalid Credentials" && (
                <Text
                    style={{
                    bottom: 80,
                    alignSelf: "flex-end",
                    color: "red",
                    fontFamily: "Roboto-bold",
                    }}
                >
                    {" "}
                    Invalid Credentials X
                </Text>
                )}
                {error === "User not found" && (
                <Text style={{ bottom: 80, alignSelf: "flex-end", color: "red" }}>
                    x User not found
                </Text>
                )}
            </View>
            <View
                style={{
                gap: 10,
                justifyContent: "center",
                alignItems: "center",
                bottom: 20,
                }}
            >
                <TouchableOpacity
                onPress={() => submit()}
                style={{
                    backgroundColor: STYLES.COLORS.Priamary,
                    width: 150,
                    height: 50,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    bottom: 40,
                }}
                >
                <Text
                    style={{
                    color: "white",
                    fontFamily: "Roboto-bold",
                    fontSize: STYLES.SIZES.sizeL,
                    }}
                >
                    Contuniue
                </Text>
                </TouchableOpacity>
                <Text style={{ bottom: 40 }}>Or</Text>
                <TouchableOpacity
                style={{
                    backgroundColor: STYLES.COLORS.Priamary,
                    width: 250,
                    height: 50,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    bottom: 40,
                }}
                >
                <View
                    style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                    }}
                >
                    <FontAwesome size={20} color="white" name="google" />
                    <Text
                    style={{
                        color: "white",
                        fontFamily: "Roboto-bold",
                        fontSize: STYLES.SIZES.sizeL,
                    }}
                    >
                    Sign In with google
                    </Text>
                </View>
                </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView>
        </ScrollView>
    );
    }

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
        fontSize: STYLES.SIZES.sizeXXL,
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        bottom: 40,
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
