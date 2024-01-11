import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  Platform,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { STYLES } from "../../../../../GlobalCss";
import { getDownloadURL } from "firebase/storage";

import { useQuery, useInfiniteQuery, useMutation } from "@tanstack/react-query";

const CommentsInputs = () => {
  const { mutateAsync: mutateAsyncTechno } = useMutation({
    mutationFn: (data) => updateProfileTechnologie(data, userId),
  });

  const uploadImage = async (imageFile, imageType) => {
    try {
      const response = await fetch(imageFile);
      const blob = await response.blob();
      const filename = imageFile.substring(imageFile.lastIndexOf("/") + 1);

      const storageRef = ref(storage, `/commentImage/${UserData.name}`);
      const imageRef = ref(storageRef, filename);
      await uploadBytes(imageRef, blob);

      const downloadURL = await getDownloadURL(imageRef);

      return { url: downloadURL, type: imageType };
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    let updatedProfileImage = null;
    let updatedCoverImage = null;

    try {
      if (profileImage) {
        const result = await uploadImage(profileImage, "profile");
        if (result) {
          updatedProfileImage = result.url;
        }
      }

      if (coverImage) {
        const result = await uploadImage(coverImage, "cover");
        if (result) {
          updatedCoverImage = result.url;
        }
      }

      const updatedMainSkills = mainSkills.map(
        ({ Technologies: { id: technologiesId } }) => ({
          userId: String(userId),
          technologiesId,
        })
      );

      const Info = {
        name: nameRef.current.value || ProfileData.name,
        userName: usernameRef.current.value || ProfileData.userName,
        bio: bioRef.current.value || ProfileData.bio,
        number: Number(phoneRef.current.value) || Number(ProfileData.number),
        pdp: updatedProfileImage,
        cover: updatedCoverImage,
      };
      await mutateAsyncInfo(Info);
      await mutateAsyncTechno(updatedMainSkills);
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setLoading(false);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageReply, setSelectedImageReply] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <View style={styles.commentContainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={70}
        behavior={Platform.OS == "ios" ? "padding" : undefined}
      >
        <TextInput placeholder="Add a comment..." style={styles.commentInput} />
        <View style={{ flexDirection: "row", position: "absolute", right: 0 }}>
          <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
            <AntDesign name={"camerao"} size={STYLES.SIZES.sizeL} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.commentButton}>
            <AntDesign name={"arrowright"} size={STYLES.SIZES.sizeL} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CommentsInputs;

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginTop: 10,
  },
  commentInput: {
    width: "100%",

    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  commentButton: {
    borderRadius: 20,
    padding: 10,
  },
  addImageButton: {
    borderRadius: 20,
    padding: 10,
  },
});
