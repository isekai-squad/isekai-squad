import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  View,
  Platform,
  ImageBackground,
} from "react-native";
import React, { useContext, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { STYLES } from "../../../../../GlobalCss";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../../FirebaseConfig";
import { useMutation } from "@tanstack/react-query";
import {
  PostProjectComment,
  PostProjectReplyComment,
  ProfileContext,
} from "../../../../Context/ProfileContext";
import { io } from "socket.io-client";
const socket = io(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070`);

const CommentsInputs = ({
  refetchProjectComments,
  projectId,
  commentType,
  replyCommentId,
  showReplyInput,
  postOwner
}) => {
  const { userId, setRefetchPosts,ProfileData } = useContext(ProfileContext);
  const [commentText, setCommentText] = useState("");
  const [selectedImageComment, setSelectedImageComment] = useState(null);
  const [loading, setLoading] = useState(false);
  // ================================================
  const { mutateAsync: PostComment } = useMutation({
    mutationFn: (data) => PostProjectComment(userId, projectId, data),
  });
  const { mutateAsync: PostPostReply } = useMutation({
    mutationFn: (data) => PostProjectReplyComment(userId, replyCommentId, data),
  });
  // ================================================

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImageComment(result.uri);
    }
  };
  const uploadImage = async (imageFile) => {
    try {
      console.log("Image File:", imageFile);

      const response = await fetch(imageFile);
      const blob = await response.blob();
      console.log("Blob:", blob);

      const filename = imageFile.substring(imageFile.lastIndexOf("/") + 1);
      console.log("Filename:", filename);

      const storageRef = ref(storage, "/commentImage");
      const imageRef = ref(storageRef, filename);

      // Log upload start
      console.log("Uploading image to Firebase Storage...");

      await uploadBytes(imageRef, blob);

      // Log upload success
      console.log("Image uploaded successfully!");

      const downloadURL = await getDownloadURL(imageRef);

      // Log download URL
      console.log("Download URL:", downloadURL);

      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    let postCommentImage = null;

    try {
      if (selectedImageComment) {
        console.log("Selected Image URI:", selectedImageComment);

        const result = await uploadImage(selectedImageComment);

        console.log("Upload Result:", result);

        if (result) {
          postCommentImage = result;
        }
      }

      if (commentType === "reply") {
        const reply = {
          userId: userId,
          content: commentText,
          image: postCommentImage,
          project_commentsId: replyCommentId,
        };

        await PostPostReply(reply);
        socket.emit("sendNotification", {
          sender: userId,
          receiver: postOwner,
          content: `${ProfileData.name} has Reply your Comment`,
          type: "Project",
          postId: projectId,
        });
      } else {
        const comment = {
          userId: userId,
          content: commentText,
          images: postCommentImage,
          projectId: projectId,
        };

        await PostComment(comment);
        socket.emit("sendNotification", {
          sender: userId,
          receiver: postOwner,
          content: `${ProfileData.name} has Comment your Project`,
          type: "Project",
          postId: projectId,
        });
      }
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      showReplyInput && showReplyInput(false);
      setLoading(false);
      setSelectedImageComment(null);
      setCommentText(null);
      setRefetchPosts(true);
      refetchProjectComments && refetchProjectComments();
    }
  };

  // ================================================

  return (
    <View style={styles.commentContainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={70}
        behavior={Platform.OS == "ios" ? "padding" : undefined}
      >
        <TextInput
          placeholder="Add a comment..."
          style={[styles.commentInput]}
          defaultValue={commentText}
          onChangeText={(text) => setCommentText(text)}
        />
        <View style={{ flexDirection: "row", position: "absolute", right: 0 }}>
          <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
            <AntDesign name={"camerao"} size={STYLES.SIZES.sizeL} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.commentButton} onPress={handleSubmit}>
            <AntDesign name={"arrowright"} size={STYLES.SIZES.sizeL} />
          </TouchableOpacity>
          {loading && (
            <ActivityIndicator
              size="large"
              color={STYLES.COLORS.Priamary}
              style={styles.loadingIndicator}
            />
          )}
        </View>
        {selectedImageComment && (
          <View>
            <ImageBackground
              source={{ uri: selectedImageComment }}
              style={{ width: 80, height: 80, marginTop: 20 }}
            >
              <View style={styles.darkOverlay} />
              <TouchableOpacity
                onPress={() => setSelectedImageComment(null)}
                style={{
                  position: "absolute",
                  top: 30,
                  left: 30,
                }}
              >
                <AntDesign
                  name={"delete"}
                  color={"white"}
                  size={STYLES.SIZES.sizeL}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default CommentsInputs;

const styles = StyleSheet.create({
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: STYLES.COLORS.ShadowColor,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginTop: 10,
    paddingVertical: 10,
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
