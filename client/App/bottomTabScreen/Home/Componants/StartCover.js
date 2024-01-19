import React, { useContext } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ProfileContext } from "../../../Context/ProfileContext";
import { STYLES } from "../../../../GlobalCss";

const StartCover = () => {
  const { ProfileData } = useContext(ProfileContext);

  return (
    <View style={styles.container}>
      {ProfileData.role === "STUDENT" ? (
        <ImageBackground
          style={styles.imageBackground}
          source={{
            uri: "https://img.freepik.com/free-photo/motivational-composition-goal-achievement_23-2150490034.jpg?w=996&t=st=1705353284~exp=1705353884~hmac=b8ebddcee4d128b2b059f57ebd3b3de967a3ab620ddedd796ff605a01d363cda",
          }}
        >
          <View style={styles.darkOverlay} />
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.quoteText}>
              "Discover effective strategies to quickly attract investors and
              secure funding for your ventures!"
            </Text>
            <TouchableOpacity style={styles.readMoreButton}>
              <Text style={styles.readMoreButtonText}>Read more</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      ) : (
        <ImageBackground
          style={styles.imageBackground}
          source={{
            uri: "https://img.freepik.com/free-vector/books-with-money-loans-scholarships_603843-826.jpg?t=st=1705353348~exp=1705353948~hmac=555304132dc8b2c0d5e074a78c372807c36ce6e22e4f3bf2e5da7080cd9f21f0",
          }}
        >
          <View style={styles.darkOverlay} />

          <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.quoteText}>
              "Discover effective strategies to quickly attract investors and
              secure funding for your ventures!"
            </Text>
            <TouchableOpacity style={styles.readMoreButton}>
              <Text style={styles.readMoreButtonText}>Read more</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginTop: 30,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: STYLES.COLORS.ShadowColor,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  quoteText: {
    fontWeight: STYLES.FONTS.Large,
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 2,
  },
  readMoreButton: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 20,
    width: "60%",
    paddingVertical: 10,
    alignSelf: "center",
  },
  readMoreButtonText: {
    fontWeight: STYLES.FONTS.bold,
    textAlign: "center",
    color: STYLES.COLORS.Priamary,
    fontSize: 16,
  },
});

export default StartCover;
