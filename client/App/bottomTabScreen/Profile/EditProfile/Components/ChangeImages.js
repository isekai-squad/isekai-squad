import React, { useEffect, useState, useRef } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { STYLES } from "../../../../../GlobalCss";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../../../../FirebaseConfig";
import { Alert } from "react-native";
function ChangeImages({ profileData }) {
  const [profileImage, setProfileImage] = useState(profileData.pdp);
  const [coverImage, setCoverImage] = useState(profileData.cover);

  const [uploading, setUploading] = useState(false);
  const storageRef = ref(getStorage(app)); // Updated storage reference creation

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const uploadImage = async () => {
    setUploading(true);

    try {
      const response = await fetch(profileImage.uri);
      const blob = await response.blob();
      const filename = profileImage.uri.substring(
        profileImage.uri.lastIndexOf("/") + 1
      );

      const imageRef = ref(storageRef, filename);
      await uploadBytes(imageRef, blob);

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(imageRef);

      console.log("Download URL:", downloadURL);
      setProfileImage(downloadURL);

      // Do something with the download URL, for example, update the state
      // or send it to a backend server
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    setUploading(false);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const source = { uri: result.assets[0].uri };
    console.log("====================================");
    console.log(source);
    console.log("====================================");
    setProfileImage(source);
  };

  return (
    <View style={styles.profileContainer}>
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
              source={{ uri: profileImage.uri }}
              style={styles.profileImage}
            ></ImageBackground>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={uploadImage}
          style={styles.changeProfileText}
        >
          <Text>Change Profile</Text>
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
              source={{ uri: coverImage }}
              style={styles.profileImage}
            ></ImageBackground>
          </View>
        </TouchableOpacity>
        <Text style={styles.changeProfileText}>Change Cover</Text>
      </View>
    </View>
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
  },
  profileImageContainer: {
    borderColor: "#eee",
    borderWidth: 3,
    borderRadius: 100,
  },
});

export default ChangeImages;
