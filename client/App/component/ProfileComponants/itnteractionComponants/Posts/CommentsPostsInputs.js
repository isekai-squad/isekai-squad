import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  View,
  Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../../FirebaseConfig";
import { useMutation } from "@tanstack/react-query";
import { ToastAndroid } from "react-native";

import {
  PostPostsComment,
  PostPostsReplyComment,
  ProfileContext,
} from "../../../../Context/ProfileContext";
import { STYLES } from "../../../../../GlobalCss";

const CommentsInputs = ({
  refetchPostsComments,
  postsCommentsId,
  commentType,
  replyCommentId,
  showReplyInput,
}) => {
  const { userId, setRefetchReplyComment } = useContext(ProfileContext);

  const [commentText, setCommentText] = useState("");
  const [selectedImageComment, setSelectedImageComment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  // ================================================
  const { mutateAsync: PostComment } = useMutation({
    mutationFn: (data) => PostPostsComment(userId, postsCommentsId, data),
  });
  const { mutateAsync: PostReply } = useMutation({
    mutationFn: (data) => PostPostsReplyComment(userId, replyCommentId, data),
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

      const storageRef = ref(storage, "/PostsCommentImage");
      const imageRef = ref(storageRef, filename);

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

        if (result) {
          postCommentImage = result;
        }
      }

      if (commentType === "reply") {
        const reply = {
          userId: userId,
          content: commentText,
          image: postCommentImage,
          post_commentsId: replyCommentId,
        };

        await PostReply(reply);
      } else {
        const comment = {
          userId: userId,
          content: commentText,
          images: postCommentImage,
          postId: postsCommentsId,
        };

        await PostComment(comment);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      showReplyInput && showReplyInput(false);
      setLoading(false);
      setSelectedImageComment(null);
      setCommentText(null);
      setRefetchReplyComment(true);
      refetchPostsComments && refetchPostsComments();
    }
  };

  // ================================================

  return (
    <View style={styles.commentContainer}>
      {alert &&
        ToastAndroid.showWithGravity(
          "should post Image or comment",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )}

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
            <Image
              source={{ uri: selectedImageComment }}
              style={{ width: 80, height: 80, marginTop: 20 }}
            />
            <TouchableOpacity
              onPress={() => setSelectedImageComment(null)}
              style={{
                position: "absolute",
                top: 50,
                left: 30,
              }}
            >
              <AntDesign name={"delete"} size={STYLES.SIZES.sizeL} />
            </TouchableOpacity>
          </View>
        )}
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
