import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Button,
  ButtonText,
  Center,
  HStack,
  Image,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";
//   import { Icon } from '@gluestack-ui/themed';
import { useNavigation, useTheme } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import Icon from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { storage } from "../../../FirebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";

 const socket = io(`http://${process.env.EXPO_PUBLIC_IP_KEY}:4070`)

const CreateComment = ({ post, user, refetch }) => {
  const [images, setImages] = useState([]);
  const [content, setContent] = useState("");
  const [percent, setPercent] = useState(0);
  // const [user, setUser] = useState("");

  const fireBaseComment = async (image) => {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
      const storageRef = ref(storage, `Forum/${post.id}/${user.name}`);
      const imageRef = ref(storageRef, filename);
      const uploadTask = uploadBytesResumable(imageRef, blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(percent);
        },
        (err) => console.log(err),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) =>
            setImages((prev) => [...prev, url])
          );
        }
      );
    });
  };

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      console.log(result);
      result.assets.map(async (image) => await fireBaseComment(image));
    }
  };

  const addComment = useMutation({
    mutationFn: async () => {
      if (images.length === 0) {
        alert("Please select an image");
      } else if (content.length === 0) {
        alert("Please enter a comment");
      } else {
        await axios
          .post(
            `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/forumComment/${user.id}/${post.id}/comments`,
            { content, images }
          )
          .then((res) => console.log("comment added successfully"))
          .then(() => {
            setContent("");
            setImages([]);
          })
          .catch((err) => console.log(err));
      }
    },
    onSuccess: () => refetch(),
  });

  return (
    <View style={styles.container}>
            <HStack alignItems="center" space="lg">
              <Textarea size="xl" h={70} borderRadius={20} w={260}>
                <TextareaInput
                  placeholder="Add a comment"
                  fontSize={16}
                  value={content}
                  onChangeText={(text) => setContent(text)}
                />
              </Textarea>
              <TouchableOpacity>
                <Icon
                  name="plus-circle"
                  size={24}
                  onPress={handleImageSelection}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name="send"
                  size={24}
                  color="#674188"
                  onPress={async () => {
                    addComment.mutate();
                    socket.emit("sendNotification" , {
                      sender : user.id,
                      receiver : post.userId,
                      content : `${user.name} has commented on your post`,
                      type : 'Forum',
                      postId : post.id
                    })
                  }}
                />
              </TouchableOpacity>
            </HStack>
            {images === 0 ? "" : (
              <HStack alignItems="center" space="md" flexWrap="wrap"paddingVertical={10}>
                {images.map((image, index) => (
                  <Image
                    key={index}
                    alt="commentImage"
                    w={100}
                    h={100}
                    borderRadius={10}
                    source={{ uri: image }}
                  />
                ))}
              </HStack>
            )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    // padding : 15,
    paddingBottom: 10,
    marginTop: 20,
    // marginBottom : 20
  },
  container1: {
    flex: 1,
    // padding : 15
  },
  textInput: {
    backgroundColor: "#C3ACD0",
    flex: 1,
    margin: 5,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
});

export default CreateComment;
