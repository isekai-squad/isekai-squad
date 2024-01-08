import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { STYLES } from "../../../../GlobalCss";

function HeaderPhoto() {
  return (
    <View>
      <ImageBackground
        resizeMode="cover"
        source={{
          uri: "https://t4.ftcdn.net/jpg/05/31/79/83/360_F_531798391_XFz7gyPmDRTAfiEE5sRjFu5NpKrJt4rC.jpg",
        }}
      >
        <View style={styles.darkness} />
      </ImageBackground>

      <View style={styles.profileImgContainer}>
        <View>
          <Image
            source={{
              uri: "https://picsum.photos/200",
            }}
            style={styles.profileImg}
          />
          <Text style={styles.active}></Text>
        </View>
        <View>
          <View style={styles.descContainer}>
            <View style={styles.descDetails}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                50
              </Text>
              <Text style={{ color: "white", fontWeight: "300", fontSize: 15 }}>
                Projects
              </Text>
            </View>
            <View style={styles.descDetails}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                50
              </Text>
              <Text style={{ color: "white", fontWeight: "300", fontSize: 15 }}>
                Followers
              </Text>
            </View>
            <View style={styles.descDetails}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                50
              </Text>
              <Text style={{ color: "white", fontWeight: "300", fontSize: 15 }}>
                Following
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  active: {
    position: "absolute",
    bottom: 2,
    right: 0,
    width: 20,
    height: 20,
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "green",
    borderRadius: 100,
  },
  darkness: {
    backgroundColor: STYLES.COLORS.ShadowColor,
    width: "100%",
    height: 130,
  },

  profileImgContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    gap: 20,
    width: "100%",
    alignItems: "center",
    position: "absolute",
    top: 25,
  },
  profileImg: {
    height: 90,
    width: 90,
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 100,
  },
  descContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  descDetails: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HeaderPhoto;
