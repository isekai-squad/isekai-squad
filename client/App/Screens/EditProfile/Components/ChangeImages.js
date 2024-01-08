import React, { useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

import { ProfileContext } from "../../../Context/ProfileContext";
import { STYLES } from "../../../../GlobalCss";

function ChangeImages() {
  const {
    ProfileData,
    profileImage,
    setProfileImage,
    coverImage,
    setCoverImage,
  } = useContext(ProfileContext);

  const pickImage = async (setImageFunction) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      const source = { uri: selectedAsset.uri };
      setImageFunction(source.uri);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.profileContainer}>
        <View>
          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={() => pickImage(setProfileImage)}
          >
            <Feather
              name="camera"
              size={20}
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                backgroundColor: "#eee",
                color: STYLES.COLORS.Priamary,
                borderRadius: 100,
                padding: 5,
                zIndex: 20,
              }}
            />
            <View
              style={{ overflow: "hidden", width: "100%", borderRadius: 100 }}
            >
              <ImageBackground
                source={{ uri: profileImage || ProfileData.pdp }}
                style={styles.profileImage}
              ></ImageBackground>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.changeProfileText}>Change Profile</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={() => pickImage(setCoverImage)}
          >
            <Feather
              name="camera"
              size={20}
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                backgroundColor: "#eee",
                color: STYLES.COLORS.Priamary,
                borderRadius: 100,
                padding: 5,
                zIndex: 20,
              }}
            />
            <View
              style={{ overflow: "hidden", width: "100%", borderRadius: 100 }}
            >
              <ImageBackground
                source={{ uri: coverImage || ProfileData.cover }}
                style={styles.profileImage}
              ></ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={styles.changeProfileText}>Change Cover</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  changeProfileText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profileImage: {
    height: 100,
    width: 100,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
    flex: 1,
  },
  profileImageContainer: {
    borderColor: "#eee",
    borderWidth: 3,
    borderRadius: 100,
  },
});

export default ChangeImages;
