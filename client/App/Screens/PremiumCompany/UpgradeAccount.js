import React, { useContext } from "react";
import {
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { STYLES } from "../../../GlobalCss";
import PaymentUpgrade from "./PaymentUpgrade";

const UpgradeAccount = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ImageBackground
        style={{ height: "100%", width: "100%" }}
        source={{
          uri: "https://img.freepik.com/vecteurs-premium/fond-fluide-degrade-rose-violet-illustration-vectorielle-abstrait_518299-1543.jpg",
        }}
      >
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "#9c95952b",
          }}
        />
        <TouchableOpacity
          style={{ left: 20, top: 50 }}
          onPress={() => navigation.navigate("Home")}
        >
          <AntDesign
            name={"close"}
            color={"white"}
            size={STYLES.SIZES.sizeXL}
          />
        </TouchableOpacity>

        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 60,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: STYLES.COLORS.Priamary,
              fontSize: STYLES.SIZES.sizeXL,
              marginBottom: 20,
              letterSpacing: 3,
              textAlign: "start",
              fontWeight: STYLES.FONTS.bold,
            }}
          >
            Upgrade To ISEKAI Premium
          </Text>
          <View style={{ width: 250, alignItems: "flex-start", gap: 35 }}>
            <FeatureItem
              title="Top Projects"
              description="Access all new projects for students."
            />
            <FeatureItem
              title="Premium Support"
              description="Get priority assistance from our support team."
            />
            <FeatureItem
              title="No Ads"
              description="Enjoy an ad-free experience."
            />
          </View>
          <PaymentUpgrade  />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const FeatureItem = ({ title, description }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
      }}
    >
      <AntDesign
        name={"rest"}
        color={STYLES.COLORS.Priamary}
        size={STYLES.SIZES.sizeL}
      />
      <View>
        <Text
          style={{
            color: STYLES.COLORS.Priamary,
            fontWeight: "bold",
            fontSize: STYLES.SIZES.sizeL,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: "black",
            fontSize: STYLES.SIZES.sizeM,
            letterSpacing: 1,
            paddingTop: 5,
          }}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};

export default UpgradeAccount;
